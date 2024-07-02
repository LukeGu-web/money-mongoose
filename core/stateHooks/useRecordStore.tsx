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
          const newRecordDateString = dayjs(record.date).format('YYYY-MM-DD');
          const newRecord = {
            date: newRecordDateString,
            sum_of_income:
              record.type === RecordTypes.INCOME ? record.amount : 0,
            sum_of_expense:
              record.type === RecordTypes.EXPENSE ? record.amount : 0,
            records: [record],
          };

          if (get().records.length === 0) {
            return {
              records: [newRecord],
            };
          } else {
            const newRecords = [...get().records];

            if (newRecords[0].date === newRecordDateString) {
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
            } else {
              newRecords.unshift(newRecord);
            }
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
