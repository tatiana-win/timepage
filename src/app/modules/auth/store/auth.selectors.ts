import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AppState } from '../../../models/app-state.model';

export const selectAuthStore = (state: AppState) => state.auth;

export const selectLoading = createSelector(
  selectAuthStore,
  (state: AuthState) => state.loading,
);

export const selectRegistrationLogin = createSelector(
  selectAuthStore,
  (state: AuthState) => state.registrationLogin,
);

export const selectIsAuth = createSelector(
  selectAuthStore,
  (state: AuthState) => state.isAuth,
);

export const selectError = createSelector(
  selectAuthStore,
  (state: AuthState) => state.error,
);
