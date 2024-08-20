import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { Record, RecordTypes, RecordsByDay } from 'api/record/types';

type RecordState = {
  records: RecordsByDay[];
  setRecords: (records: RecordsByDay[]) => void;
  addRecord: (record: Record) => void;
  updateRecord: (record: Record) => void;
  removeRecord: (id: number) => void;
  resetRecords: () => void;
};

export const useRecordStore = create<RecordState>()(
  devtools(
    persist(
      immer((set, get) => ({
        records: [],
        setRecords: (records) => {
          set(() => ({ records }));
        },
        addRecord: (record) => {
          set((state) => {
            const newRecordDateString = dayjs(record.date).format('YYYY-MM-DD');
            const newRecord = {
              date: newRecordDateString,
              sum_of_income:
                record.type === RecordTypes.INCOME ? record.amount : 0,
              sum_of_expense:
                record.type === RecordTypes.EXPENSE ? record.amount : 0,
              records: [record],
            };

            const existingIndex = state.records.findIndex(
              (r) => r.date === newRecordDateString
            );

            if (existingIndex !== -1) {
              const existingRecord = state.records[existingIndex];
              existingRecord.records.push(record);
              existingRecord.sum_of_income +=
                record.type === RecordTypes.INCOME ? record.amount : 0;
              existingRecord.sum_of_expense +=
                record.type === RecordTypes.EXPENSE ? record.amount : 0;
            } else {
              state.records.push(newRecord);
            }

            state.records.sort(
              (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
            );
          });
        },
        updateRecord: (updatedRecord) => {
          set((state) => {
            const updatedRecordDateString = dayjs(updatedRecord.date).format(
              'YYYY-MM-DD'
            );
            let recordFound = false;

            state.records.forEach((dayRecord) => {
              const recordIndex = dayRecord.records.findIndex(
                (r) => r.id === updatedRecord.id
              );
              if (recordIndex !== -1) {
                // Adjust income and expense sums
                const oldRecord = dayRecord.records[recordIndex];
                if (oldRecord.type === RecordTypes.INCOME) {
                  dayRecord.sum_of_income -= oldRecord.amount;
                } else {
                  dayRecord.sum_of_expense -= oldRecord.amount;
                }

                dayRecord.records[recordIndex] = updatedRecord;

                if (updatedRecord.type === RecordTypes.INCOME) {
                  dayRecord.sum_of_income += updatedRecord.amount;
                } else {
                  dayRecord.sum_of_expense += updatedRecord.amount;
                }

                recordFound = true;
              }
            });

            if (!recordFound) {
              // If the record wasn't found, treat it as a new record
              get().addRecord(updatedRecord);
            } else {
              // Ensure the records are sorted correctly
              state.records.sort(
                (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
              );
            }
          });
        },
        removeRecord: (recordId) => {
          set((state) => {
            state.records.forEach((dayRecord) => {
              const recordIndex = dayRecord.records.findIndex(
                (r) => r.id === recordId
              );
              if (recordIndex !== -1) {
                const [removedRecord] = dayRecord.records.splice(
                  recordIndex,
                  1
                );

                if (removedRecord.type === RecordTypes.INCOME) {
                  dayRecord.sum_of_income -= removedRecord.amount;
                } else {
                  dayRecord.sum_of_expense -= removedRecord.amount;
                }
              }
            });

            // Filter out any empty records by day
            state.records = state.records.filter(
              (dayRecord) => dayRecord.records.length > 0
            );

            state.records.sort(
              (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
            );
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
  )
);

export default useRecordStore;
