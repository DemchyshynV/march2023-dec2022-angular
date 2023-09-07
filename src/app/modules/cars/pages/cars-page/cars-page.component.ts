import {Component, OnInit} from '@angular/core';
import {ICar} from "../../../../interfaces/car.interface";
import {PageEvent} from "@angular/material/paginator";
import {CarService} from "../../../../services/car.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cars-page',
  templateUrl: './cars-page.component.html',
  styleUrls: ['./cars-page.component.css']
})
export class CarsPageComponent implements OnInit {
  cars: ICar[]
  length: number;
  pageIndex: number;


  pageSize = 10

  constructor(private carService: CarService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(({page}) => {
      this.carService.getAll(page).subscribe(value => {
        this.length = value.total_items
        this.cars = value.items
      })
    })
  }

  handlePageEvent(e: PageEvent) {
    this.router.navigate([], {queryParams: {page: e.pageIndex + 1}})
  }

}
