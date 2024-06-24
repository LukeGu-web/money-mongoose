import { RecordVariables } from 'api/record/types';
import { create } from 'zustand';

type RecordState = {
  records: RecordVariables[];
  addRecord: (record: RecordVariables) => void;
};

export const useRecordList = create<RecordState>((set) => ({
  records: [],
  addRecord: (record) => {
    set((state) => ({ records: [...state.records, record] }));
  },
}));
