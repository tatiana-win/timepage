import { AbstractControl } from '@angular/forms';

export interface INewPasswordForm {
    pass: AbstractControl<string>;
    repass: AbstractControl<string>;
}
