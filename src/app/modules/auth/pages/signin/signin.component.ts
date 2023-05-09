import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { clearAuth, clearRegistrationLogin, signIn } from '../../store/auth.actions';
import { filter, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app-state.model';
import { selectError, selectIsAuth, selectLoading } from '../../store/auth.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface ILogInForm {
  username: FormControl<string>;
  pass: FormControl<string>;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent {
  loading$: Observable<boolean>;
  loading = false;
  logInForm = this.fb.group(
    {
      username: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    }
  ) as FormGroup<ILogInForm>;

  constructor(
    private readonly fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loading$ = this.store.select(selectLoading);
    this.loading$.subscribe(loading => (this.loading = loading));
    this.store.select(selectError)
      .pipe(
        filter(Boolean),
      )
      .subscribe((error) => {
        this.snackBar.open(error, undefined, {
          duration: 5000
        });
      });
    this.store.select(selectIsAuth)
      .pipe(
        filter(Boolean),
      )
      .subscribe((error) => {
        this.router.navigate(['/calendar']);
      });
  }

  ngOnDestroy() {
    this.store.dispatch(clearAuth());
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
