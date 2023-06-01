import { Pipe, PipeTransform } from '@angular/core';
import { RepeatPeriod } from '../../../models/note.model';

@Pipe({
  name: 'periodName',
})
export class PeriodNamePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case RepeatPeriod.week:
        return 'Every week';
      case RepeatPeriod.month:
        return 'Every month';
      case RepeatPeriod.year:
        return 'Every year';
      default:
        return 'Every week';
    }
  }
}
