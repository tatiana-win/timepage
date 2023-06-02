import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  setToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  getToken() {
    return localStorage.getItem(KEY);
  }

  resetToken() {
    localStorage.removeItem(KEY);
  }
}
