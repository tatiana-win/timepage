import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DescriptionRules } from '../../../../models/input-rules.model';

@Component({
    selector: 'app-input-error',
    templateUrl: './input-error.component.html',
    styleUrls: ['./input-error.component.less'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputErrorComponent {
    @Input() form!: FormGroup;
    @Input() control!: AbstractControl;
    @Input() errors!: DescriptionRules[];

    isRulesApplied(error: DescriptionRules) {
      return error.rules.every((rule) => this.control[rule])
    }
}
