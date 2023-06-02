import { Component } from '@angular/core';
import { AppState } from '../../../../models/app-state.model';
import { Store } from '@ngrx/store';
import { loadCalendarNotes, loadTodoNotes } from '../../store/calendar.actions';
import {
  addDays,
  getEndOfWeek,
  getStartOfWeek,
  isStringDateValid,
  subtractDays,
} from '../../../../helpers/date.util';
import {
  formatDateForApi,
  formatEndDayForApi,
} from '../../../../helpers/formatter.util';
import { filter, Subscription } from 'rxjs';
import { selectNotesError } from '../../store/calendar.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { logout } from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
})
export class CalendarComponent {
  startDate: Date;
  endDate: Date;
  errorSubscription?: Subscription;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) {
    const startDate = this.activatedRoute.snapshot.queryParams['startDate'];
    if (startDate && isStringDateValid(startDate)) {
      this.startDate = getStartOfWeek(new Date(startDate));
      this.endDate = getEndOfWeek(new Date(startDate));
    } else {
      this.startDate = getStartOfWeek(new Date());
      this.endDate = getEndOfWeek(new Date());
    }
  }

  ngOnInit() {
    this.getNotes();
    this.store.dispatch(loadTodoNotes());

    this.errorSubscription = this.store
      .select(selectNotesError)
      .pipe(filter(Boolean))
      .subscribe(error => {
        this.snackBar.open(error, undefined, {
          duration: 5000,
        });
      });
  }

  ngOnDestroy() {
    this.errorSubscription?.unsubscribe();
  }

  onBackClick() {
    this.startDate = subtractDays(this.startDate, 7);
    this.endDate = subtractDays(this.endDate, 7);
    this.getNotes();
  }

  onForwardClick() {
    this.startDate = addDays(this.startDate, 7);
    this.endDate = addDays(this.endDate, 7);
    this.getNotes();
  }

  private getNotes() {
    this.store.dispatch(
      loadCalendarNotes({
        startDate: formatDateForApi(this.startDate),
        endDate: formatEndDayForApi(this.endDate),
      }),
    );
  }

  logout() {
    this.store.dispatch(logout());
  }
}
