import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CONFIG } from '../../../../config';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
  ) {}
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${CONFIG.apiUrl}/auth/signup`,
      {
        username,
        email,
        password,
      },
      httpOptions,
    );
  }

  login(username: string, password: string): Observable<any> {
    // @ts-ignore
    return this.http
      .post(
        `${CONFIG.apiUrl}/auth/signin`,
        {
          username,
          password,
        },
        httpOptions,
      )
      .pipe(
        map(({ accessToken }: any) => {
          this.tokenService.setToken(accessToken);
          return accessToken;
        }),
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${CONFIG.apiUrl}/auth/signout`, {}).pipe(
      map(() => {
        this.tokenService.resetToken();
        this.router.navigate(['/auth/signin']);
      }),
    );
  }
}
