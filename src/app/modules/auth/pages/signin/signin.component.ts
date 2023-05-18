import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  clearAuth,
  clearRegistrationLogin,
  signIn,
} from '../../store/auth.actions';
import { filter, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app-state.model';
import {
  selectError,
  selectIsAuth,
  selectLoading,
} from '../../store/auth.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface ILogInForm {
  username: FormControl<string>;
  pass: FormControl<string>;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less'],
})
export class SigninComponent {
  loading = false;
  logInForm = this.fb.group({
    username: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  }) as FormGroup<ILogInForm>;

  errorSubscription: Subscription;
  loadingSubscription: Subscription;
  isAuthSubscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.loadingSubscription = this.store
      .select(selectLoading)
      .subscribe(loading => (this.loading = loading));
    this.errorSubscription = this.store
      .select(selectError)
      .pipe(filter(Boolean))
      .subscribe(error => {
        this.snackBar.open(error, undefined, {
          duration: 5000,
        });
      });
    this.isAuthSubscription = this.store
      .select(selectIsAuth)
      .pipe(filter(Boolean))
      .subscribe(error => {
        this.router.navigate(['/calendar']);
      });
  }

  ngOnDestroy() {
    this.store.dispatch(clearAuth());
    this.errorSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.isAuthSubscription.unsubscribe();
  }

  get isDisabled(): boolean {
    return this.loading || this.logInForm.invalid;
  }

  onLogin() {
    const { username, pass: password } = this.logInForm.value;
    if (username && password) {
      this.store.dispatch(signIn({ username, password }));
    }
  }
}
