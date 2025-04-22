import { DateTime } from 'luxon';
import { DatePickerTimeEnum } from '..';

export interface IDatePickerChange {
  startDate: DateTime;
  endDate: DateTime;
}

export interface IExtractTime extends IDatePickerChange {
  format: string;
  showSingle?: boolean;
}

export interface IDatesOfDatePicker {
  sDate: Date;
  eDate: Date;
}

export interface IDateTimeItem {
  key: DatePickerTimeEnum;
  label: string;
}
