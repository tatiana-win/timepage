import { Note } from '../../../models/note.model';
import { Row } from '../models/row.model';

export const fillRows = (notes: Note[], minCount: number) => {
  const rows: Row[] = notes.map(note => ({
    id: note.id,
    text: note.title,
    color: note.color,
    completed: note.completed
  }));

  if (notes.length < minCount) {
    const emptyRowsCount = minCount - notes.length;
    for (let i = 0; i < emptyRowsCount; i++) {
      rows.push({});
    }
  }

  return rows;
}
