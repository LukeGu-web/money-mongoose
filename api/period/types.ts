import type { RecordAPI as RecordType } from '../record/types';

export type ScheduledRecordType = RecordType & {
  frequency: string;
  start_date: Date;
  end_date?: Date;
  month_day?: number;
  week_days?: number[];
  num_of_days?: number;
};
