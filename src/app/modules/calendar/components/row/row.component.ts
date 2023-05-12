import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Row } from '../../models/row.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent {
  @Input() row!: Row;
  @Input() interactive?: boolean;

  @Output() rowClick = new EventEmitter<Row>;
  @Output() rowChange = new EventEmitter<Row>;

  get isInteractive() {
    return !!this.row.text || this.interactive;
  }

  onClick(event: MouseEvent) {
    // @ts-ignore
    if (event.target?.getAttribute('type') === 'checkbox') {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.rowClick.emit(this.row);
  }

  onChange({ checked }: MatCheckboxChange) {
    this.rowChange.emit({ ...this.row, completed: checked });
  }
}
