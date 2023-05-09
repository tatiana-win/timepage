import { Validators } from '@angular/forms';
import { DescriptionRules, InputRules } from '../../../models/input-rules.model';

export const PASSWORD_MIN_LENGTH = 6;
export const LOGIN_MIN_LENGTH = 6;

const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const VALIDATORS = {
  LOGIN: [Validators.required, Validators.minLength(LOGIN_MIN_LENGTH)],
  PASS: [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)],
  EMAIL: [Validators.pattern(EMAIL_PATTERN)],
  EMAIL_REQUIRED: [Validators.required, Validators.pattern(EMAIL_PATTERN)],
};

export const defaultRules: InputRules[] = [InputRules.touched, InputRules.dirty];

export const defaultErrors = {
  required: new DescriptionRules('required', 'Поле обязательно для заполнения', [...defaultRules]),
  email: new DescriptionRules('pattern', 'Введите корректный Email', [...defaultRules]),
  repass: new DescriptionRules('repass', 'Пароли не совпадают', [InputRules.dirty]),
  minLength(length: number) {
    return new DescriptionRules('minlength', `Минимальная длина ${length} символов`, [InputRules.dirty]);
  },
  maxLength(length: number) {
    return new DescriptionRules('maxlength', `Превышена максимальная длина в ${length} символов`, [
      InputRules.dirty
    ]);
  },
  pattern(pattern: string) {
    return new DescriptionRules('pattern', `Поле должно соответствовать шаблону: ${pattern}`, [...defaultRules]);
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
