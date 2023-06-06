import { Component, Inject } from '@angular/core';
import { Note } from '../../../../models/note.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  note: Note;
}

export enum DeleteResult {
  'one',
  'all',
}

@Component({
  selector: 'app-delete-event-dialog',
  templateUrl: './delete-event-dialog.component.html',
  styleUrls: ['./delete-event-dialog.component.less'],
})
export class DeleteEventDialogComponent {
  note: Note;

  text: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.note = data.note;
    this.text = this.note.repeatable
      ? 'Do you want to delete only this event or all repeats?'
      : 'Are you sure you want to delete this event?';
  }

  cancel() {
    this.dialogRef.close();
  }

  deleteEvent() {
    this.dialogRef.close(DeleteResult.one);
  }

  deleteAllEvents() {
    this.dialogRef.close(DeleteResult.all);
  }
}
