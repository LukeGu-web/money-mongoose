import { RecordTypes, RecordVariables } from 'api/record/types';
import { create } from 'zustand';

type RecordState = {
  record: RecordVariables;
  setRecord: (updates: Partial<RecordVariables>) => void;
  resetRecord: () => void;
};

export const useRecord = create<RecordState>((set) => ({
  record: {
    type: 'expense',
    category: '',
    subcategory: '',
    note: '',
    amount: 0,
  },
  setRecord: (updates) => {
    set((state) => ({ record: { ...state.record, ...updates } }));
  },
  resetRecord: () => {
    set(() => ({
      record: {
        type: 'expense',
        category: '',
        subcategory: '',
        note: '',
        amount: 0,
      },
    }));
  },
}));
