import { createReducer, on } from '@ngrx/store';
import { Note } from '../../../models/note.model';
import {
  calendarNotesLoaded,
  createNote,
  deleteNote,
  loadCalendarNotes,
  loadNotesError,
  loadTodoNotes, resetRequestSucceded,
  todoNotesLoaded,
  setRequestSucceded,
  updateNote, updateMinRowsCount
} from './calendar.actions';

const MIN_ROWS_COUNT = 6;

export interface CalendarState {
  loading: boolean;
  error?: string;
  calendarNotes?: Record<string, Note[]>;
  todoNotes: Note[];
  loaded: boolean;
  requestSuccess: boolean;
  minRowsCount: number;
}

export const initialState: CalendarState = {
  loading: false,
  todoNotes: [],
  loaded: false,
  requestSuccess: false,
  minRowsCount: MIN_ROWS_COUNT
};

export const calendarReducer = createReducer(
  initialState,
  on(loadCalendarNotes, (state) => ({
    ...state,
    error: undefined,
    loading: true,
  })),
  on(loadTodoNotes, (state) => ({
    ...state,
    error: undefined,
    loading: true,
  })),
  on(calendarNotesLoaded, (state, {calendarNotes}) => ({
    ...state,
    error: undefined,
    loading: false,
    loaded: true,
    calendarNotes,
  })),
  on(todoNotesLoaded, (state, {todoNotes}) => ({
    ...state,
    error: undefined,
    loading: false,
    loaded: true,
    todoNotes,
  })),
  on(loadNotesError, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),
  on(createNote, (state) => ({
    ...state,
    error: undefined,
    requestSuccess: false,
    loading: true
  })),
  on(updateNote, (state) => ({
    ...state,
    error: undefined,
    requestSuccess: false,
    loading: true
  })),
  on(deleteNote, (state) => ({
    ...state,
    error: undefined,
    requestSuccess: false,
    loading: true
  })),
  on(setRequestSucceded, (state) => ({
    ...state,
    error: undefined,
    requestSuccess: true,
    loading: false
  })),
  on(resetRequestSucceded, (state) => ({
    ...state,
    requestSuccess: false,
  })),
  on(updateMinRowsCount, (state, { count }) => ({
    ...state,
    minRowsCount: count,
  }))
);
