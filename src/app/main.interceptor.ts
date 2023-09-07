import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "./services/auth.service";
import {urls} from "./constants/urls";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  isRefreshing = false
  waitRefreshSubject = new BehaviorSubject<string>(null)

  constructor(private authService: AuthService, private matDialog: MatDialog, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      request = this._addToken(request, accessToken)
    }

    return next.handle(request).pipe(
      catchError((res: HttpErrorResponse) => {
        if (res && res.error && res.status === 401) {
          const refreshToken = this.authService.getRefreshToken();

          if (!this.isRefreshing && refreshToken) {
            return this._handle401Error(request, next, refreshToken)
          }

          if (res.url === urls.auth.refresh) {
            this.isRefreshing = false
            this.authService.deleteTokens()
            this.matDialog.closeAll()
            this.router.navigate(['auth', 'login'], {queryParams: {sessionExpired: true}})
            return throwError(() => res)
          }

          return this.waitRefreshSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap(token => {
              return next.handle(this._addToken(request, token))
            })
          )
        }
        return throwError(() => res)
      })
    )
  }

  _addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })
  }

  _handle401Error(request: HttpRequest<any>, next: HttpHandler, refreshToken: string): any {
    this.isRefreshing = true
    return this.authService.refresh(refreshToken).pipe(
      switchMap((tokens) => {
        this.isRefreshing = false
        this.waitRefreshSubject.next(tokens.access)
        return next.handle(this._addToken(request, tokens.access))
      })
    )
  }
}
