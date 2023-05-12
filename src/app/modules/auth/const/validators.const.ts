import { Validators } from '@angular/forms';
import { DescriptionRules, InputRules } from '../../../models/input-rules.model';

export const PASSWORD_MIN_LENGTH = 6;
export const LOGIN_MIN_LENGTH = 6;

const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const VALIDATORS = {
  LOGIN: [Validators.required, Validators.minLength(LOGIN_MIN_LENGTH)],
  PASS: [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)],
  EMAIL: [Validators.pattern(EMAIL_PATTERN)],
  EMAIL_REQUIRED: [Validators.required, Validators.pattern(EMAIL_PATTERN)],
};

export const defaultRules: InputRules[] = [InputRules.dirty];

export const defaultErrors = {
  required: new DescriptionRules('required', 'Required field', [...defaultRules]),
  email: new DescriptionRules('pattern', 'Email is incorrect', [...defaultRules]),
  repass: new DescriptionRules('repass', 'Passwords don\'t match' , [InputRules.dirty]),
  minLength(length: number) {
    return new DescriptionRules('minlength', `Minimal length is ${length} symbols`, [...defaultRules]);
  },
  maxLength(length: number) {
    return new DescriptionRules('maxlength', `Maximum length of ${length} symbols is exceeded`, [
      ...defaultRules
    ]);
  },
  pattern(pattern: string) {
    return new DescriptionRules('pattern', `Field must satisfy to pattern: ${pattern}`, [...defaultRules]);
  }
};

export const VALIDATION_ERRORS = {
  LOGIN: [defaultErrors.required, defaultErrors.minLength(LOGIN_MIN_LENGTH)],
  EMAIL: [defaultErrors.email],
  EMAIL_REQUIRED: [defaultErrors.required, defaultErrors.email],
  PASS: [defaultErrors.required, defaultErrors.minLength(PASSWORD_MIN_LENGTH)],
  REPASS: [
    defaultErrors.required,
    defaultErrors.pattern('строки'),
    defaultErrors.repass
  ]
};
