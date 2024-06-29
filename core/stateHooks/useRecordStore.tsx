import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Record, RecordsByDay } from 'api/record/types';

type RecordState = {
  records: RecordsByDay[];
  setRecords: (records: RecordsByDay[]) => void;
  addRecord: (record: Record) => void;
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
          const newRecords = [...get().records];
          newRecords[0] = {
            ...newRecords[0],
            records: [...newRecords[0].records, record],
          };
          console.log('useRecordStore: ', newRecords);
          return { records: newRecords };
        });
      },
    })),
    {
      name: 'record-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useRecordStore;
