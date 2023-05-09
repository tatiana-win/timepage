import { INewPasswordForm } from '../models/new-password-form.model';
import { FormGroup } from '@angular/forms';

/**
 * Проверяет совпадает ли содержимое полей Пароль и Повторите пароль
 */
export function repassValidators(group: FormGroup<INewPasswordForm>): null {
    const {pass, repass} = group.controls;

    if (pass.value && repass.value && pass.value !== repass.value) {
        repass.setErrors({repass: true, ...repass.errors});
    } else if (repass.errors && 'repass' in repass.errors) {
        /**
         * Делаем так, чтобы repass не был invalid
         */
        repass.setErrors(Object.keys(repass.errors).length > 0 ? repass.errors : null);
    }

    return null;
}
