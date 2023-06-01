export enum RepeatPeriod {
  week = 'week',
  month = 'month',
  year = 'year',
}
export interface Note {
  id: string;
  title: string;
  description?: string;
  color?: string;
  completed: boolean;
  date?: string;
  hasTime?: boolean;
  repeatable?: boolean;
  period?: RepeatPeriod;
}
