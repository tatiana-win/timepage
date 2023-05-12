import { createSelector } from '@ngrx/store';
import { AppState } from '../../../models/app-state.model';
import { CalendarState } from './calendar.reducer';

export const selectCalendarStore = (state: AppState) => state.calendar;

export const selectLoading = createSelector(
  selectCalendarStore,
  (state: CalendarState) => state.loading,
);

export const selectCalendarNotes = createSelector(
  selectCalendarStore,
  (state: CalendarState) => state.calendarNotes,
);

export const selectTodoNotes = createSelector(
  selectCalendarStore,
  (state: CalendarState) => state.todoNotes,
);

export const selectNotesError = createSelector(
  selectCalendarStore,
  (state: CalendarState) => state.error,
);

export const selectIsNotesLoaded = createSelector(
  selectCalendarStore,
  (state: CalendarState) => state.loaded,
);

export const selectIsRequestSucceded = createSelector(
  selectCalendarStore,
  (state: CalendarState) => state.requestSuccess,
);

export const selectNotesForDay = createSelector(
  selectCalendarStore,
  (state: CalendarState, date: string) =>
    state.calendarNotes && state.calendarNotes[date],
);

export const selectMinRowsCount = createSelector(
  selectCalendarStore,
  (state: CalendarState) => state.minRowsCount,
);
