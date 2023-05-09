import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of } from 'rxjs';
import { exhaustMap, catchError } from 'rxjs/operators';
import { NotesService } from '../services/notes.service';
import {
  calendarNotesLoaded,
  createNote,
  deleteNote,
  loadCalendarNotes,
  loadNotesError, loadTodoNotes, todoNotesLoaded,
  setRequestSucceded,
  updateNote
} from './calendar.actions';

@Injectable()
export class CalendarEffects {
  loadCalendarNotes$ = createEffect(() => this.actions$.pipe(
      ofType(loadCalendarNotes.type),
      exhaustMap(({ startDate, endDate }) =>
        (this.notesService.getNotes(startDate, endDate))
          .pipe(
            map((result) => (calendarNotesLoaded({ calendarNotes: result }))),
            catchError((error) => of(loadNotesError({ error: error?.error?.message || 'Unknown error'  })))
          ))
    )
  );

  loadTodoNotes$ = createEffect(() => this.actions$.pipe(
      ofType(loadTodoNotes.type),
      exhaustMap(() =>
        (this.notesService.getNotes())
          .pipe(
            map((result) => (todoNotesLoaded({ todoNotes: result }))),
            catchError((error) => of(loadNotesError({ error: error?.error?.message || 'Unknown error'  })))
          ))
    )
  );

  createNote$ = createEffect(() => this.actions$.pipe(
      ofType(createNote.type),
      exhaustMap((note) =>
        (this.notesService.createNote(note))
          .pipe(
            map(() => (setRequestSucceded())),
            catchError((error) => of(loadNotesError({ error: error?.error?.message || 'Unknown error'  })))
          ))
    )
  );

  updateNote$ = createEffect(() => this.actions$.pipe(
      ofType(updateNote.type),
      exhaustMap((note) =>
        (this.notesService.updateNote(note))
          .pipe(
            map(() => (setRequestSucceded())),
            catchError((error) => of(loadNotesError({ error: error?.error?.message || 'Unknown error'  })))
          ))
    )
  );

  deleteNote$ = createEffect(() => this.actions$.pipe(
      ofType(deleteNote.type),
      exhaustMap((note) =>
        (this.notesService.deleteNote(note))
          .pipe(
            map(() => (setRequestSucceded())),
            catchError((error) => of(loadNotesError({ error: error?.error?.message || 'Unknown error'  })))
          ))
    )
  );

  constructor(
    private actions$: Actions,
    private notesService: NotesService
  ) {}
}
