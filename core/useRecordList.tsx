import { Record } from 'api/record/types';
import { create } from 'zustand';

type RecordState = {
  records: Record[];
  addRecord: (record: Record) => void;
};

export const useRecordList = create<RecordState>((set) => ({
  records: [],
  addRecord: (record) => {
    set((state) => ({ records: [...state.records, record] }));
  },
}));
