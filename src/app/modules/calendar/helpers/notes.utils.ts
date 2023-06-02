import { Note } from '../../../models/note.model';
import { formatToDateAndMonth } from '../../../helpers/formatter.util';

/**
 * Format notes array to Dictionary<Date, Note[]>
 * @param notes
 */
export const formatNotes = (notes: Note[]) => {
  const notesByDates = notes.reduce((acc, currentValue) => {
    const date = new Date(currentValue.date ?? '');
    const dateString = formatToDateAndMonth(date);
    if (acc[dateString]) {
      acc[dateString].push(currentValue);
    } else {
      acc[dateString] = [currentValue];
    }
    return acc;
  }, {} as Record<string, Note[]>);

  for (const day in notesByDates) {
    notesByDates[day] = notesByDates[day].sort(sortNotesByTime);
  }

  return notesByDates;
};

/**
 * Sort notes by time
 * If note has no time it will be after notes with time
 * @param a
 * @param b
 */
const sortNotesByTime = (a: Note, b: Note) => {
  if (
    (!a.hasTime && b.hasTime) ||
    (a.hasTime && b.hasTime && a.date && b.date && a.date > b.date)
  ) {
    return 1;
  }
  if (
    (!b.hasTime && a.hasTime) ||
    (a.hasTime && b.hasTime && a.date && b.date && b.date > a.date)
  ) {
    return -1;
  }

  return 0;
};
