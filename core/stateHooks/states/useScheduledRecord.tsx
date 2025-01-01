import { create } from 'zustand';
import { ScheduledRecordStateType } from 'api/period/types';
import { RecordTypes } from 'api/record/types';

type ScheduledRecordState = {
  scheduledRecord: ScheduledRecordStateType;
  setScheduledRecord: (updates: Partial<ScheduledRecordStateType>) => void;
  resetScheduledRecord: () => void;
};

export const defaultScheduledRecord = {
  id: -1,
  type: RecordTypes.EXPENSE,
  category: '',
  subcategory: '',
  note: '',
  amount: 0,
  date: new Date(),
  book: -1,
  is_marked_tax_return: false,
  start_date: new Date(),
};

const useScheduledRecord = create<ScheduledRecordState>((set) => ({
  scheduledRecord: defaultScheduledRecord,
  setScheduledRecord: (updates) => {
    set((state) => ({
      scheduledRecord: { ...state.scheduledRecord, ...updates },
    }));
  },
  resetScheduledRecord: () => {
    set(() => ({
      scheduledRecord: defaultScheduledRecord,
    }));
  },
}));

export default useScheduledRecord;
