import {Component, Input} from '@angular/core';
import {IUser} from "../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  user: IUser

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.activatedRoute.params.subscribe(({id}) => {
      const state = this.router.getCurrentNavigation()?.extras.state as IUser;

      if (state) {
        this.user = state
      } else {
        this.userService.getById(id).subscribe(value => this.user = value)
      }
    })
  }
}
