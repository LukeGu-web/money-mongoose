import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { Record, RecordTypes, RecordsByDay } from 'api/record/types';

type RecordState = {
  records: RecordsByDay[];
  setRecords: (records: RecordsByDay[]) => void;
  addRecord: (record: Record) => void;
  resetRecords: () => void;
};

export const useRecordStore = create<RecordState>()(
  persist(
    devtools((set, get) => ({
      records: [],
      setRecords: (records) => {
        set(() => ({ records }));
      },
      addRecord: (record) => {
        set(() => {
          if (get().records.length === 0) {
            return {
              records: [
                {
                  date: dayjs(record.date).format('YYYY-MM-DD'),
                  sum_of_income:
                    record.type === RecordTypes.INCOME ? record.amount : 0,
                  sum_of_expense:
                    record.type === RecordTypes.EXPENSE ? record.amount : 0,
                  records: [record],
                },
              ],
            };
          } else {
            const newRecords = [...get().records];
            newRecords[0] = {
              ...newRecords[0],
              records: [...newRecords[0].records, record],
              sum_of_income:
                record.type === RecordTypes.INCOME
                  ? newRecords[0].sum_of_income + Number(record.amount)
                  : newRecords[0].sum_of_income,
              sum_of_expense:
                record.type === RecordTypes.EXPENSE
                  ? newRecords[0].sum_of_expense + Number(record.amount)
                  : newRecords[0].sum_of_expense,
            };
            return { records: newRecords };
          }
        });
      },
      resetRecords: () => {
        set(() => ({
          records: [],
        }));
      },
    })),
    {
      name: 'record-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useRecordStore;
