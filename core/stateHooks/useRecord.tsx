import { Record, RecordTypes, RecordVariables } from 'api/record/types';
import { create } from 'zustand';

type RecordState = {
  record: RecordVariables;
  selectedRecord: Record;
  setRecord: (updates: Partial<RecordVariables>) => void;
  setSelectedRecord: (record: Record) => void;
  resetRecord: () => void;
  resetSelectedRecord: () => void;
};
const defaultRecord = {
  type: RecordTypes.EXPENSE,
  category: '',
  subcategory: '',
  note: '',
  amount: 0,
};

const defaultExtra = {
  id: 0,
  author: '',
  created_at: '',
  updated_at: '',
  date: '',
};

const useRecord = create<RecordState>((set) => ({
  record: defaultRecord,
  selectedRecord: {
    ...defaultRecord,
    ...defaultExtra,
  },
  setRecord: (updates) => {
    set((state) => ({ record: { ...state.record, ...updates } }));
  },
  setSelectedRecord: (record) => {
    set(() => ({ selectedRecord: record }));
  },
  resetRecord: () => {
    set(() => ({
      record: defaultRecord,
    }));
  },
  resetSelectedRecord: () => {
    set(() => ({
      record: defaultRecord,
    }));
  },
}));

export default useRecord;
