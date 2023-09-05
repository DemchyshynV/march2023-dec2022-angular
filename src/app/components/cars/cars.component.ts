import {Component, OnInit} from '@angular/core';
import {ICar} from "../../interfaces/car.interface";
import {HttpClient} from "@angular/common/http";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: ICar[]

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.carService.getTriggerStatus().subscribe(() => {
      this.carService.getAll().subscribe(value => this.cars = value)
    })
  }

}
