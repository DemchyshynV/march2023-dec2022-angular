import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuth} from "../interfaces/auth.interface";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ITokens} from "../interfaces/tokens.interface";
import {urls} from "../constants/urls";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _accessTokenKey = 'access'
  private readonly _refreshTokenKey = 'refresh'
  private authUserSubject = new BehaviorSubject<IAuth>(null)
  constructor(private httpClient: HttpClient) {
  }

  login(user: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.login, user).pipe(
      tap((token) => {
        this._setTokens(token)
        this.me().subscribe(user=>this.setAuthUser(user))
      })
    )
  }

  refresh(refresh:string):Observable<ITokens>{
    return this.httpClient.post<ITokens>(urls.auth.refresh, {refresh}).pipe(
      tap(tokens=>{
        this._setTokens(tokens)
      })
    )
  }

  me(): Observable<IAuth> {
    return this.httpClient.get<IAuth>(urls.auth.me).pipe(
      tap(user=>this.authUserSubject.next(user))
    )
  }

  getAuthUser():Observable<IAuth>{
    return this.authUserSubject.asObservable()
  }

  setAuthUser(user:IAuth):void{
    this.authUserSubject.next(user)
  }
  private _setTokens({access, refresh}: ITokens): void {
    localStorage.setItem(this._accessTokenKey, access)
    localStorage.setItem(this._refreshTokenKey, refresh)
  }

  getAccessToken(): string {
    return localStorage.getItem(this._accessTokenKey) || ''
  }

  getRefreshToken(): string {
    return localStorage.getItem(this._refreshTokenKey) || ''
  }

  deleteTokens():void{
    localStorage.removeItem(this._accessTokenKey)
    localStorage.removeItem(this._refreshTokenKey)
  }
}
