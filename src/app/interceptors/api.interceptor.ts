import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

type HTTPRequestBody = {} | null;
type HTTPResponseBody = {} | null;

/**
 * @class ApiInterceptor
 * При получении 401 ошибки редиректит на страницу логина
 */
@Injectable({
  providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router, private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<HTTPRequestBody>,
    next: HttpHandler,
  ): Observable<HttpEvent<HTTPResponseBody>> {
    const req$ = next.handle(
      request.clone({
        headers: request.headers.set(
          'x-access-token',
          this.tokenService.getToken() || '',
        ),
      }),
    );

    return req$.pipe(
      catchError((error): never => {
        if (error.status === 401) {
          this.router.navigate(['/auth/signin']);
        }

        throw error;
      }),
    );
  }
}
