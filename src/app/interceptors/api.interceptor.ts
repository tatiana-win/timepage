import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

type HTTPRequestBody = {} | null;
type HTTPResponseBody = {} | null;

/**
 * @class ApiInterceptor
 * При получении 401 ошибки редиректит на страницу логина
 */
@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<HTTPRequestBody>, next: HttpHandler): Observable<HttpEvent<HTTPResponseBody>> {
    let req$ = next.handle(request.clone({
      headers: request.headers.set('x-access-token', localStorage.getItem('token') || '')
    }));

    return req$.pipe(
      catchError(
        (error): never => {
          if (error.status === 401) {
            this.router.navigate(['/auth/signin'])
          }

          throw error;
        }
      )
    );
  }
}
