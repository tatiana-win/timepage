import { createAction, props } from '@ngrx/store';
import { Note } from '../../../models/note.model';

export const loadCalendarNotes = createAction(
  '[Calendar] Load Calendar Notes',
  props<{ startDate: string; endDate: string }>(),
);

export const loadTodoNotes = createAction('[Calendar] Load Todo Notes');

export const calendarNotesLoaded = createAction(
  '[Calendar] Calendar Notes Loaded',
  props<{ calendarNotes: Record<string, Note[]> }>(),
);

export const todoNotesLoaded = createAction(
  '[Calendar] Todo Notes Loaded',
  props<{ todoNotes: Note[] }>(),
);

export const loadNotesError = createAction(
  '[Calendar] Load Notes Error',
  props<{ error: string }>(),
);

export const createNote = createAction(
  '[Calendar] Create Note',
  props<Omit<Note, 'id'>>(),
);

export const updateNote = createAction('[Calendar] Update Note', props<Note>());

export const deleteNote = createAction('[Calendar] Delete Note', props<Note>());

export const deleteNoteForDate = createAction(
  '[Calendar] Delete Note For Date',
  props<Note>(),
);

export const setRequestSucceded = createAction('[Calendar] Request Succeded');

export const resetRequestSucceded = createAction(
  '[Calendar] Reset Request Succeded',
);

export const updateMinRowsCount = createAction(
  '[Calendar] Update Min Rows Count',
  props<{ count: number }>(),
);

export const completeNote = createAction(
  '[Calendar] Complete Note',
  props<Note>(),
);

export const revertNoteCompletion = createAction(
  '[Calendar] Revert Note Completion',
  props<Note>(),
);
