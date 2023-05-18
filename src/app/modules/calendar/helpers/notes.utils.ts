import { Note } from '../../../models/note.model';
import { formatToDateAndMonth } from '../../../helpers/formatter.util';

export const formatNotes = (notes: Note[]) => {
  return notes.reduce((acc, currentValue) => {
    const date = new Date(currentValue.date ?? '');
    const dateString = formatToDateAndMonth(date);
    if (acc[dateString]) {
      acc[dateString].push(currentValue);
    } else {
      acc[dateString] = [currentValue];
    }
    return acc;
  }, {} as Record<string, Note[]>);
};
