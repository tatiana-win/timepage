import { createAction, props } from '@ngrx/store';

export const signIn = createAction(
  '[Auth] SignIn',
  props<{ username: string; password: string }>(),
);

export const signUp = createAction(
  '[Auth] SignUp',
  props<{ username: string; email: string; password: string }>(),
);

export const authError = createAction(
  '[Auth] Error',
  props<{ error: string }>(),
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ login: string }>(),
);

export const loginSuccess = createAction('[Auth] Login Success');

export const clearRegistrationLogin = createAction(
  '[Auth] Clear Registration Login',
);
export const clearAuth = createAction('[Auth] Clear Auth');
