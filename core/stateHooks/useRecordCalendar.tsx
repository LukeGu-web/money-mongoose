import { Record } from 'api/record/types';
import { create } from 'zustand';

type RecordState = {
  records: Record[];
  setRecords: (records: Record[]) => void;
  addRecord: (record: Record) => void;
};

const useRecordCalendar = create<RecordState>((set) => ({
  records: [],
  setRecords: (records) => {
    set(() => ({ records }));
  },
  addRecord: (record) => {
    set((state) => ({ records: [...state.records, record] }));
  },
}));

export default useRecordCalendar;
