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
  date: new Date(),
  asset: null,
  book: -1,
  is_marked_tax_return: false,
};

const defaultExtra = {
  id: -1,
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
