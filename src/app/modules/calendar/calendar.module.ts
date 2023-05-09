import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarRouter } from './calendar.router';
import { NotesService } from './services/notes.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CalendarEffects } from './store/calendar.effects';
import { calendarReducer } from './store/calendar.reducer';
import { HeaderDatePipe } from './pipes/header-date.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DayComponent } from './components/day/day.component';
import { DateWithMonthPipe } from './pipes/date-with-month.pipe';
import { DayOfWeekPipe } from './pipes/day-of-week.pipe';
import { WeekComponent } from './components/week/week.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../auth/services/auth.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { RowComponent } from './components/row/row.component';

@NgModule({
  declarations: [
    CalendarComponent,
    HeaderDatePipe,
    DayComponent,
    DateWithMonthPipe,
    DayOfWeekPipe,
    WeekComponent,
    NoteDialogComponent,
    TodoListComponent,
    RowComponent
  ],
  imports: [
    CommonModule,
    CalendarRouter,
    EffectsModule.forFeature([CalendarEffects]),
    StoreModule.forFeature('calendar', calendarReducer),
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    NotesService,
    AuthService,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ]
})
export class CalendarModule { }
