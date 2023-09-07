import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPagination} from "../interfaces/pagination.interface";
import {ICar} from "../interfaces/car.interface";
import {urls} from "../constants/urls";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(page=1):Observable<IPagination<ICar>>{
    return this.httpClient.get<IPagination<ICar>>(urls.cars, {params:{page}})
  }
}
