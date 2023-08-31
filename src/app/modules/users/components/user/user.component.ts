import {Component, Input} from '@angular/core';
import {IUser} from "../../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input()
  user: IUser

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  toDetails(): void {
    this.router.navigate([this.user.id], {relativeTo: this.activatedRoute})

  }
}
