import { Pipe, PipeTransform } from '@angular/core';
import { formatToMonthAndYear } from '../../../helpers/formatter.util';

@Pipe({
  name: 'headerDate',
})
export class HeaderDatePipe implements PipeTransform {
  transform(date: Date): string {
    return formatToMonthAndYear(date);
  }
}
