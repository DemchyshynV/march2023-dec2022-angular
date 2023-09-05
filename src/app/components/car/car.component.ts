import {Component, Input} from '@angular/core';
import {ICar} from "../../interfaces/car.interface";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  @Input()
  car: ICar
  constructor(private carService:CarService) {
  }
  update():void {
    this.carService.setCarForUpdate(this.car)
  }

  delete():void {
    this.carService.deleteById(this.car.id).subscribe()
  }
}
