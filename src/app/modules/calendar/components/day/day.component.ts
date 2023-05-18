import { Component, Input, SimpleChanges } from '@angular/core';
import { isToday } from '../../../../helpers/date.util';
import { Note } from '../../../../models/note.model';
import { Row } from '../../models/row.model';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app-state.model';
import {
  selectMinRowsCount,
  selectNotesForDay,
} from '../../store/calendar.selectors';
import { Subscription } from 'rxjs';
import { updateMinRowsCount, updateNote } from '../../store/calendar.actions';
import { fillRows } from '../../helpers/rows.utils';
import { formatToDateAndMonth } from '../../../../helpers/formatter.util';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.less'],
})
export class DayComponent {
  @Input() date!: Date;
  minRowCount!: number;

  notes: Note[] = [];

  rows: Row[] = [];
  notesSubscription?: Subscription;
  rowsCountSubscrption?: Subscription;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {
    this.notesSubscription = this.store
      .select(selectNotesForDay, formatToDateAndMonth(this.date))
      .subscribe(notes => {
        this.notes = notes ?? [];
        const minRowsCount =
          this.minRowCount > this.notes.length
            ? this.minRowCount
            : this.notes.length + 1;
        if (minRowsCount > this.minRowCount) {
          this.minRowCount = minRowsCount;
          this.store.dispatch(updateMinRowsCount({ count: minRowsCount }));
        }
        this.rows = fillRows(this.notes, minRowsCount);
      });
    this.rowsCountSubscrption = this.store
      .select(selectMinRowsCount, this.date.toISOString().split('T')[0])
      .subscribe(count => {
        this.minRowCount = count;
        this.rows = fillRows(this.notes, count);
      });
    this.rows = fillRows(this.notes, this.minRowCount);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['minRowsCount']) {
      this.rows = fillRows(this.notes, changes['minRowsCount'].currentValue);
    }
  }

  ngOnDestroy() {
    this.rowsCountSubscrption?.unsubscribe();
    this.notesSubscription?.unsubscribe();
  }

  get isActive() {
    return isToday(this.date);
  }

  openDialog(id?: string): void {
    const note = this.notes.find(n => n.id === id);
    this.dialog.open(NoteDialogComponent, {
      data: { date: this.date, note, withDate: true },
    });
  }

  updateCompleted(row: Row) {
    const note = this.notes.find(n => n.id === row.id);
    if (note) {
      this.store.dispatch(updateNote({ ...note, completed: !!row.completed }));
    }
  }
}
