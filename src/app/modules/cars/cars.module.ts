import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import {CarsPageComponent} from "./pages/cars-page/cars-page.component";


@NgModule({
  declarations: [
    CarsPageComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule
  ],
})
export class CarsModule { }
