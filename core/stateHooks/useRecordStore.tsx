import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {
  RecordAPI as Record,
  RecordTypes,
  RecordsByDay,
  TransferAPI as Transfer,
} from 'api/record/types';
import useBookStore from './useBookStore';

type RecordState = {
  records: RecordsByDay[];
  setRecords: (records: RecordsByDay[]) => void;
  resetRecords: () => void;
  addRecord: (record: Record) => void;
  updateRecord: (record: Record) => void;
  removeRecord: (id: number) => void;
  addTransfer: (record: Transfer) => void;
  updateTransfer: (record: Transfer) => void;
  removeTransfer: (id: number) => void;
};

export const useRecordStore = create<RecordState>()(
  devtools(
    persist(
      immer((set, get) => ({
        records: [],
        setRecords: (records) => {
          set(() => ({ records }));
        },
        resetRecords: () => {
          set(() => ({
            records: [],
          }));
        },
        addRecord: (record) => {
          set((state) => {
            // Update asset balance
            if (record.asset) {
              const bookStore = useBookStore.getState();
              bookStore.changeBalance(record.asset, record.amount);
            }
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
                if ((oldRecord as Record).type === RecordTypes.INCOME) {
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

                if ((removedRecord as Record).type === RecordTypes.INCOME) {
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
        addTransfer: (transfer) => {
          set((state) => {
            const transferDateString = dayjs().format('YYYY-MM-DD');
            const newTransfer = {
              date: transferDateString,
              sum_of_income: 0,
              sum_of_expense: 0,
              records: [transfer],
            };

            const existingTransferIndex = state.records.findIndex(
              (r) => r.date === transferDateString
            );

            if (existingTransferIndex !== -1) {
              state.records[existingTransferIndex].records.push(transfer);
            } else {
              state.records.unshift(newTransfer);
            }

            state.records.sort((a, b) =>
              dayjs(b.date).isAfter(dayjs(a.date)) ? 1 : -1
            );
          });
        },
        updateTransfer: (transfer) => {
          set((state) => {
            state.records.forEach((r) => {
              const index = r.records.findIndex(
                (rec) => rec.id === transfer.id
              );
              if (index !== -1) {
                r.records[index] = transfer;
                state.records.sort((a, b) =>
                  dayjs(b.date).isAfter(dayjs(a.date)) ? 1 : -1
                );
              }
            });
          });
        },
        removeTransfer: (id) => {
          set((state) => {
            state.records.forEach((r) => {
              const index = r.records.findIndex((rec) => rec.id === id);
              if (index !== -1) {
                r.records.splice(index, 1);

                if (r.records.length === 0) {
                  state.records = state.records.filter(
                    (rec) => rec.date !== r.date
                  );
                }

                state.records.sort((a, b) =>
                  dayjs(b.date).isAfter(dayjs(a.date)) ? 1 : -1
                );
              }
            });
          });
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
