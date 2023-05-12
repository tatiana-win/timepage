import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of } from 'rxjs';
import { exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import {
  authError,
  loginSuccess,
  registerSuccess,
  signIn,
  signUp,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp.type),
      exhaustMap(({ username, email, password }) =>
        this.authService.register(username, email, password).pipe(
          map(() => registerSuccess({ login: username })),
          catchError(error =>
            of(authError({ error: error?.error?.message || 'Unknown error' })),
          ),
        ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn.type),
      exhaustMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(({ accessToken }) => {
            return loginSuccess();
          }),
          catchError(error =>
            of(authError({ error: error?.error?.message || 'Unknown error' })),
          ),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
