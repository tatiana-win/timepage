import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { isToday } from '../../../../helpers/date.util';
import { Note } from '../../../../models/note.model';
import { Row } from '../../models/row.model';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app-state.model';
import { selectMinRowsCount, selectNotesError, selectNotesForDay } from '../../store/calendar.selectors';
import { filter } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { createNote, updateMinRowsCount, updateNote } from '../../store/calendar.actions';
import { fillRows } from '../../helpers/rows.utils';



@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.less']
})
export class DayComponent {
  @Input() date!: Date;
  minRowCount!: number;

  notes: Note[] = [];

  rows: Row[] = [];

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select(selectNotesForDay, this.date.toISOString().split('T')[0])
      .subscribe(notes => {
        this.notes = notes ?? [];
        const minRowsCount = this.minRowCount > this.notes.length ? this.minRowCount : this.notes.length + 1;
        if (minRowsCount > this.minRowCount) {
          this.minRowCount = minRowsCount
          this.store.dispatch(updateMinRowsCount({ count: minRowsCount}));
        }
        this.rows = fillRows(this.notes, minRowsCount);
      })
    this.store.select(selectMinRowsCount, this.date.toISOString().split('T')[0])
      .subscribe(count => {
        this.minRowCount = count;
        this.rows = fillRows(this.notes, count);
      })
    this.rows = fillRows(this.notes, this.minRowCount);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['minRowsCount']) {
      this.rows = fillRows(this.notes, changes['minRowsCount'].currentValue);
    }
  }

  get isActive() {
    return isToday(this.date);
  }

  openDialog(id?: string): void {
    const note = this.notes.find(n => n.id === id);
    this.dialog.open(NoteDialogComponent, {
      data: { date: this.date , note, withDate: true },
    });
  }

  updateCompleted(row: Row) {
    const note = this.notes.find(n => n.id === row.id);
    if (note) {
      this.store.dispatch(updateNote({ ...note, completed: !!row.completed }));
    }
  }
}
