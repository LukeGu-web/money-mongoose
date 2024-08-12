import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookType } from 'api/book/types';

type BookState = {
  books: BookType[];
  currentBook: BookType | null;
  setBooks: (books: BookType[]) => void;
  selectBook: (book: BookType) => void;
  addBook: (account: BookType) => void;
  // resetAccounts: () => void;
};

const useBookStore = create<BookState>()(
  persist(
    devtools((set) => ({
      books: [],
      currentBook: null,
      setBooks: (books) => {
        set(() => ({ books }));
      },
      selectBook: (book) => {
        set(() => ({ currentBook: book }));
      },
      addBook: (book) => {
        set((state) => ({ books: [...state.books, book] }));
      },
    })),
    {
      name: 'book-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useBookStore;
