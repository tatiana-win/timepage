import {Pipe, PipeTransform} from '@angular/core';
import { formatToDayOfWeek } from '../../../helpers/formatter.util';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {
  transform(date: Date): string {
    return formatToDayOfWeek(date);
  }
}
