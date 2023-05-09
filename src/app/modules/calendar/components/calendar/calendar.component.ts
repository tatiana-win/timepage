import { Component } from '@angular/core';
import { AppState } from '../../../../models/app-state.model';
import { Store } from '@ngrx/store';
import { loadCalendarNotes, loadTodoNotes } from '../../store/calendar.actions';
import { addDays, getEndOfWeek, getStartOfWeek, subtractDays } from '../../../../helpers/date.util';
import { formatDateForApi } from '../../../../helpers/formatter.util';
import { filter } from 'rxjs';
import { selectNotesError } from '../../store/calendar.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent {

  startDate: Date;
  endDate: Date;
  now = new Date();

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.startDate = getStartOfWeek(new Date());
    this.endDate = getEndOfWeek(new Date());
  }

  ngOnInit() {
    this.getNotes();
    this.store.dispatch(loadTodoNotes());

    this.store.select(selectNotesError)
      .pipe(
        filter(Boolean),
      )
      .subscribe((error) => {
        this.snackBar.open(error, undefined, {
          duration: 5000
        });
      });
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
    this.store.dispatch(loadCalendarNotes({ startDate: formatDateForApi(this.startDate), endDate: formatDateForApi(this.endDate) }))
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/signin']);
    });
  }
}
