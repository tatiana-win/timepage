import { Component, Inject } from '@angular/core';
import { Note } from '../../../../models/note.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app-state.model';
import {
  createNote,
  deleteNote,
  loadCalendarNotes, loadTodoNotes,
  resetRequestSucceded,
  updateNote
} from '../../store/calendar.actions';
import { filter } from 'rxjs';
import { selectIsRequestSucceded } from '../../store/calendar.selectors';
import { getEndOfWeek, getStartOfWeek } from '../../../../helpers/date.util';
import { formatDateForApi, formatDateWithTimeForApi } from '../../../../helpers/formatter.util';

interface INoteForm {
  title: FormControl<string>;
  date: FormControl<Date>;
  color: FormControl<string>;
}

interface DialogData {
  note?: Note;
  date?: Date;
  withDate: boolean;
}

const DEFAULT_STYLE = 'default';
const NOTE_STYLES = [
  DEFAULT_STYLE,
  'red',
  'green',
  'blue',
  'yellow'
]

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.less']
})
export class NoteDialogComponent {
  styles = NOTE_STYLES;

  noteForm = this.fb.group(
    {
      title: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      color: [DEFAULT_STYLE]
    }
  ) as FormGroup<INoteForm>;

  note?: Note;
  date?: Date;
  withDate: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
    this.noteForm.setValue({
      title: data.note?.title || '',
      date: data.note?.date ? new Date(data.note.date) : data.date || new Date(),
      color: data.note?.color || DEFAULT_STYLE
    });
    this.note = data.note;
    this.date = data.date;
    this.withDate = data.withDate;
  }

  ngOnInit() {
    this.store.select(selectIsRequestSucceded)
      .pipe(
        filter(Boolean),
      )
      .subscribe(() => {
        this.dialogRef.close();
        this.store.dispatch(resetRequestSucceded());
        if (this.withDate && this.date) {
          const startDate = getStartOfWeek(this.date);
          const endDate = getEndOfWeek(this.date);
          this.store.dispatch(loadCalendarNotes({ startDate: formatDateForApi(startDate), endDate: formatDateForApi(endDate) }));
        } else {
          this.store.dispatch(loadTodoNotes());
        }
      });
  }

  save() {
    const { title, date, color } = this.noteForm.value;
    if (!title || !date) {
      return;
    }

    const note = this.note ? {
      ...this.note,
      title,
      date: this.withDate ? formatDateWithTimeForApi(date) : undefined,
      color
    } : {
      title,
      date: this.withDate ? formatDateWithTimeForApi(date) : undefined,
      color,
      completed: false
    };

    this.store.dispatch(this.note?.id ? updateNote(note as Note) : createNote(note));
  }

  delete() {
    if (this.note) {
      this.store.dispatch(deleteNote(this.note));
    }
  }
}
