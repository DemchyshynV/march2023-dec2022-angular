import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app.component';
import {HttpClientModule} from "@angular/common/http";
import { CarsComponent } from './components/cars/cars.component';
import { CarComponent } from './components/car/car.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarComponent,
    CarFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
