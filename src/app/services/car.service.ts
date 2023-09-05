import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ICar} from "../interfaces/car.interface";
import {urls} from "../constants/urls";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private trigger = new BehaviorSubject<boolean>(null)
  private carForUpdate = new BehaviorSubject<ICar>(null)

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<ICar[]> {
    return this.httpClient.get<ICar[]>(urls.cars.base)
  }

  create(data: ICar): Observable<ICar> {
    return this.httpClient.post<ICar>(urls.cars.base, data).pipe(
      tap(()=>{
        this.updateTrigger()
      })
    )
  }

  updateById(id: number, data: ICar): Observable<ICar> {
    return this.httpClient.put<ICar>(urls.cars.byId(id), data).pipe(
      tap(()=>{
        this.updateTrigger()
      })
    )
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(urls.cars.byId(id)).pipe(
      tap(()=>{
        this.updateTrigger()
      })
    )
  }

  getTriggerStatus():Observable<boolean>{
    return this.trigger.asObservable()
  }

  setCarForUpdate(car:ICar):void{
    this.carForUpdate.next(car)
  }
  getCarForUpdate():Observable<ICar>{
    return this.carForUpdate.asObservable()
  }
  private updateTrigger():void{
    this.trigger.next(!this.trigger.value)
  }
}
