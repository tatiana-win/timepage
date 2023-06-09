import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app-state.model';
import { Note } from '../../../../models/note.model';
import { Row } from '../../models/row.model';
import { selectTodoNotes } from '../../store/calendar.selectors';
import { fillRows } from '../../helpers/rows.utils';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { updateNote } from '../../store/calendar.actions';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

const MIN_ROWS_COUNT = 12;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less'],
})
export class TodoListComponent {
  notes: Note[] = [];

  rows: Row[] = [];

  minRowsCount = MIN_ROWS_COUNT;
  notesSubscription: Subscription;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.notesSubscription = this.store
      .select(selectTodoNotes)
      .subscribe(notes => {
        this.notes = notes ?? [];
        const minRowsCount =
          this.minRowsCount > this.notes.length
            ? this.minRowsCount
            : this.notes.length + 3 - (this.notes.length % 3);

        if (minRowsCount > this.minRowsCount) {
          this.minRowsCount = minRowsCount;
        }

        this.rows = fillRows(this.notes, minRowsCount);
      });
    this.rows = fillRows(this.notes, MIN_ROWS_COUNT);
  }

  ngOnDestroy() {
    this.notesSubscription.unsubscribe();
  }

  openDialog(id?: string): void {
    const note = this.notes.find(n => n.id === id);
    this.dialog.open(NoteDialogComponent, {
      data: { note, withDate: false },
    });
  }

  updateCompleted(row: Row) {
    const note = this.notes.find(n => n.id === row.id);
    if (note) {
      this.store.dispatch(updateNote({ ...note, completed: !!row.completed }));
    }
  }
}
