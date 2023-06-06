import { Component, Inject } from '@angular/core';
import { Note, RepeatPeriod } from '../../../../models/note.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app-state.model';
import {
  createNote,
  deleteNote,
  deleteNoteForDate,
  loadCalendarNotes,
  loadTodoNotes,
  resetRequestSucceded,
  updateNote,
} from '../../store/calendar.actions';
import { filter, Subscription } from 'rxjs';
import { selectIsRequestSucceded } from '../../store/calendar.selectors';
import { getEndOfWeek, getStartOfWeek } from '../../../../helpers/date.util';
import {
  formatDateForApi,
  formatDateWithTimeForApi,
  formatEndDayForApi,
  formatTime,
} from '../../../../helpers/formatter.util';
import {
  DeleteEventDialogComponent,
  DeleteResult,
} from '../delete-event-dialog/delete-event-dialog.component';

interface INoteForm {
  title: FormControl<string>;
  date: FormControl<Date>;
  color: FormControl<string>;
  hasTime: FormControl<boolean>;
  time: FormControl<string>;
  repeatable: FormControl<boolean>;
  period: FormControl<RepeatPeriod>;
}

interface DialogData {
  note?: Note;
  date?: Date;
  withDate: boolean;
}

const DEFAULT_STYLE = 'default';
const NOTE_STYLES = [DEFAULT_STYLE, 'red', 'green', 'blue', 'yellow'];
const DEFAULT_PERIOD = RepeatPeriod.week;

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.less'],
})
export class NoteDialogComponent {
  styles = NOTE_STYLES;
  periods = Object.values(RepeatPeriod);

  noteForm = this.fb.group({
    title: ['', [Validators.required]],
    date: [new Date(), [Validators.required]],
    color: [DEFAULT_STYLE],
    hasTime: [false],
    time: ['00:00'],
    repeatable: [false],
    period: [DEFAULT_PERIOD],
  }) as FormGroup<INoteForm>;

  note?: Note;
  date?: Date;
  withDate: boolean;

  successSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
  ) {
    this.noteForm.setValue({
      title: data.note?.title || '',
      date: data.note?.date
        ? new Date(data.note.date)
        : data.date || new Date(),
      color: data.note?.color || DEFAULT_STYLE,
      time:
        data.note?.hasTime && data.note?.date
          ? formatTime(new Date(data.note.date))
          : '00:00',
      hasTime: !!data.note?.hasTime,
      repeatable: !!data.note?.repeatable,
      period:
        !!data.note?.repeatable && data.note.period
          ? data.note.period
          : DEFAULT_PERIOD,
    });
    this.note = data.note;
    this.date = data.date;
    this.withDate = data.withDate;
    if (data.note?.hasTime) {
      this.noteForm.controls.time.enable();
    } else {
      this.noteForm.controls.time.disable();
    }
    if (data.note?.repeatable) {
      this.noteForm.controls.period.enable();
    } else {
      this.noteForm.controls.period.disable();
    }
  }

  ngOnInit() {
    this.successSubscription = this.store
      .select(selectIsRequestSucceded)
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.dialogRef.close();
        this.store.dispatch(resetRequestSucceded());
        if (this.withDate && this.date) {
          const startDate = getStartOfWeek(this.date);
          const endDate = getEndOfWeek(this.date);
          this.store.dispatch(
            loadCalendarNotes({
              startDate: formatDateForApi(startDate),
              endDate: formatEndDayForApi(endDate),
            }),
          );
        } else {
          this.store.dispatch(loadTodoNotes());
        }
      });
  }

  ngOnDestroy() {
    this.successSubscription?.unsubscribe();
  }

  save() {
    const { title, date, color, hasTime, time, repeatable, period } =
      this.noteForm.value;
    if (!title || !date) {
      return;
    }

    const note = this.note
      ? {
          ...this.note,
          title,
          date: this.withDate
            ? formatDateWithTimeForApi(date, hasTime ? time : undefined)
            : undefined,
          color,
          hasTime,
          repeatable,
          period: repeatable ? period : undefined,
        }
      : {
          title,
          date: this.withDate
            ? formatDateWithTimeForApi(date, hasTime ? time : undefined)
            : undefined,
          color,
          completed: false,
          hasTime,
          repeatable,
          period: repeatable ? period : undefined,
        };

    this.store.dispatch(
      this.note?.id ? updateNote(note as Note) : createNote(note),
    );
  }

  delete() {
    if (this.note) {
      const ref = this.dialog.open(DeleteEventDialogComponent, {
        data: { note: this.note },
      });

      ref.afterClosed().subscribe(result => {
        if (!this.note || result == undefined) {
          return;
        }
        if (this.note.repeatable && result === DeleteResult.one) {
          return this.store.dispatch(deleteNoteForDate(this.note));
        }
        return this.store.dispatch(deleteNote(this.note));
      });
    }
  }

  triggerTime() {
    if (this.noteForm.controls.hasTime.value) {
      this.noteForm.controls.time.enable();
    } else {
      this.noteForm.controls.time.disable();
    }
  }

  triggerPeriod() {
    if (this.noteForm.controls.repeatable.value) {
      this.noteForm.controls.period.enable();
    } else {
      this.noteForm.controls.period.disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
