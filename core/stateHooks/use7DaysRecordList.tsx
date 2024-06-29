import type { Record, RecordsByDay } from 'api/record/types';
import { create } from 'zustand';

type RecordState = {
  recordsData: RecordsByDay[];
  set7DaysRecords: (recordsData: RecordsByDay[]) => void;
  addRecord: (record: Record) => void;
};

export const use7DaysRecordList = create<RecordState>((set) => ({
  recordsData: [],
  set7DaysRecords: (recordsData) => {
    set(() => ({ recordsData }));
  },
  addRecord: (record) => {
    set((state) => {
      const newRecords = [...state.recordsData];
      newRecords[0] = {
        ...newRecords[0],
        records: [...newRecords[0].records, record],
      };
      console.log('use7DaysRecordList: ', newRecords);
      return { recordsData: newRecords };
    });
  },
}));
