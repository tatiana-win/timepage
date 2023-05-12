import { Component, Input, SimpleChanges } from '@angular/core';
import { addDays } from '../../../../helpers/date.util';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.less'],
})
export class WeekComponent {
  @Input() startDate!: Date;

  dates!: Date[];

  ngOnInit() {
    this.fillDates(this.startDate);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startDate']) {
      const startDate = changes['startDate'].currentValue as Date;
      this.fillDates(startDate);
    }
  }

  private fillDates(startDate: Date) {
    this.dates = [];
    for (let i = 0; i < 7; i++) {
      this.dates.push(addDays(startDate, i));
    }
  }
}
