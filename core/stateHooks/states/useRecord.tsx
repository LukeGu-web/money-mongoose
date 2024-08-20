import { create } from 'zustand';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Record, RecordTypes } from 'api/record/types';

dayjs.extend(customParseFormat);

type RecordState = {
  record: Record;
  setRecord: (updates: Partial<Record>) => void;
  resetRecord: () => void;
};
const defaultRecord = {
  id: -1,
  type: RecordTypes.EXPENSE,
  category: '',
  subcategory: '',
  note: '',
  amount: 0,
  date: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
  asset: null,
  book: -1,
  is_marked_tax_return: false,
};

const useRecord = create<RecordState>((set) => ({
  record: defaultRecord,
  setRecord: (updates) => {
    set((state) => ({ record: { ...state.record, ...updates } }));
  },
  resetRecord: () => {
    set(() => ({
      record: defaultRecord,
    }));
  },
}));

export default useRecord;
