import type { RecordAPI as RecordType } from '../record/types';

export enum FrequencyTypes {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ANNUALLY = 'annually',
}

export type ScheduledRecordType = RecordType & {
  frequency?: FrequencyTypes;
  start_date: Date;
  end_date?: Date;
  month_day?: number;
  week_days?: number[];
  num_of_days?: number;
};
