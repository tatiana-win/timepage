import { AuthState } from '../modules/auth/store/auth.reducer';
import { CalendarState } from '../modules/calendar/store/calendar.reducer';

export interface AppState {
  auth: AuthState;
  calendar: CalendarState;
}
