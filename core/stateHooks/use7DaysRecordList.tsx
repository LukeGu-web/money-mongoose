import type { Record, RecordsByDay } from 'api/record/types';
import { create } from 'zustand';

type RecordState = {
  recordsData: RecordsByDay[];
  set7DaysRecords: (recordsData: RecordsByDay[]) => void;
  // addRecord: (record: Record) => void;
};

export const use7DaysRecordList = create<RecordState>((set) => ({
  recordsData: [],
  set7DaysRecords: (recordsData) => {
    set(() => ({ recordsData }));
  },
  // addRecord: (record) => {
  //   set((state) => ({ recordsData: [...state.recordsData, state.recordsData[0]:{...state.recordsData[0], records: [...state.recordsData[0].records,record]}] }));
  // },
}));
