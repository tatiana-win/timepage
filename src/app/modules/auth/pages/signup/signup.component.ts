import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VALIDATION_ERRORS, VALIDATORS } from '../../const/validators.const';
import { repassValidators } from '../../utils/repass-validators.util';
import { Store } from '@ngrx/store';
import { clearRegistrationLogin, signUp } from '../../store/auth.actions';
import { selectError, selectLoading, selectRegistrationLogin } from '../../store/auth.selectors';
import { filter } from 'rxjs';
import { AppState } from '../../../../models/app-state.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface IRegistrationForm {
  username: FormControl<string>;
  email: FormControl<string>;
  pass: FormControl<string>;
  repass: FormControl<string>;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent {
  loading = false;
  regForm = this.fb.group(
    {
      username: ['', VALIDATORS.LOGIN],
      email: ['', VALIDATORS.EMAIL_REQUIRED],
      pass: ['', VALIDATORS.PASS],
      repass: ['', VALIDATORS.PASS]
    },
    {
      validators: repassValidators,
      updateOn: 'change'
    }
  ) as FormGroup<IRegistrationForm>;

  errors = {
    username: VALIDATION_ERRORS.LOGIN,
    email: VALIDATION_ERRORS.EMAIL_REQUIRED,
    pass: VALIDATION_ERRORS.PASS,
    repass: VALIDATION_ERRORS.REPASS
  }

  constructor(
    private readonly fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.store.select(selectLoading).subscribe(loading => (this.loading = loading));
    this.store.select(selectRegistrationLogin)
      .pipe(
        filter(Boolean),
      )
      .subscribe(() => {
        this.snackBar.open('Account has been successfully created', undefined, {
          duration: 3000
        });
        this.router.navigate(['/auth/signin']);
      });

    this.store.select(selectError)
      .pipe(
        filter(Boolean),
      )
      .subscribe((error) => {
        this.snackBar.open(error, undefined, {
          duration: 5000
        });
      });
  }

  ngOnDestroy() {
    this.store.dispatch(clearRegistrationLogin());
  }

  get isDisabled(): boolean {
    return this.loading || this.regForm.invalid;
  }

  onRegistration() {
    const { username, email, pass: password } = this.regForm.value;
    if (username && email && password) {
      this.store.dispatch(signUp({ username, email, password }));
    }
  }
}
