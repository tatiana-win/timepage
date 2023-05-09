import { createReducer, on } from '@ngrx/store';
import {
  authError,
  clearAuth,
  clearRegistrationLogin,
  loginSuccess,
  registerSuccess,
  signIn,
  signUp
} from './auth.actions';

export interface AuthState {
  loading: boolean;
  error?: string;
  registrationLogin: string;
  isAuth: boolean;
}

export const initialState: AuthState = {
  loading: false,
  registrationLogin: '',
  isAuth: false
};

export const authReducer = createReducer(
  initialState,
  on(signUp, (state) => ({
    ...state,
    error: undefined,
    loading: true
  })),
  on(signIn, (state) => ({
    ...state,
    error: undefined,
    loading: true
  })),
  on(authError, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),
  on(registerSuccess, (state, {login}) => ({
      ...state,
      error: undefined,
      loading: false,
      registrationLogin: login
    }
  )),
  on(loginSuccess, (state) => ({
      ...state,
      error: undefined,
      loading: false,
      isAuth: true
    }
  )),
  on(clearRegistrationLogin, (state) => ({
    ...state,
    error: undefined,
    loading: false,
    registrationLogin: ''
  })),
  on(clearAuth, (state) => ({
    ...state,
    error: undefined,
    loading: false,
    isAuth: false
  })),
);
