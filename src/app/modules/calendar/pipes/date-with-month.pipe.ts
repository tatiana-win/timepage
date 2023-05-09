import {Pipe, PipeTransform} from '@angular/core';
import { formatToDateAndMonth } from '../../../helpers/formatter.util';

@Pipe({
  name: 'dateWithMonth'
})
export class DateWithMonthPipe implements PipeTransform {
  transform(date: Date): string {
    return formatToDateAndMonth(date);
  }
}
