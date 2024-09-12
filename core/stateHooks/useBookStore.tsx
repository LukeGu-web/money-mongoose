import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookType } from 'api/types';

type BookState = {
  currentBook: BookType;
  setCurrentBook: (book: BookType) => void;
};

const useBookStore = create<BookState>()(
  devtools(
    persist(
      immer((set, get) => ({
        currentBook: { id: -1, name: '', note: '', monthly_goal: null },
        setCurrentBook: (book) => {
          set(() => ({ currentBook: book }));
        },
      })),
      {
        name: 'book-storage', // unique name
        storage: createJSONStorage(() => AsyncStorage), // Add this here!
      }
    )
  )
);

export default useBookStore;
