import type { RecordAPI as RecordType, Record } from '../record/types';

export enum FrequencyTypes {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ANNUALLY = 'annually',
}

export enum TaskStatusTypes {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export type ScheduledRecordType = RecordType & {
  frequency?: FrequencyTypes;
  start_date: Date;
  end_date?: Date;
  month_day?: number;
  week_days?: number[];
  num_of_days?: number;
};

export type ScheduledRecordResponseType = ScheduledRecordType & {
  execution_count: number;
  next_occurrence: Date;
  status: TaskStatusTypes;
};

export type ScheduledRecordDetailsType = ScheduledRecordResponseType & {
  generated_records: RecordType[];
};

// for record state use
export type ScheduledRecordStateType = Record & {
  frequency?: FrequencyTypes;
  start_date: Date;
  end_date?: Date;
  month_day?: number;
  week_days?: number[];
  num_of_days?: number;
  execution_count: number;
  next_occurrence: Date;
  status: TaskStatusTypes;
};
