import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookType } from 'api/book/types';

type BookState = {
  books: BookType[];
  currentBook: BookType | null;
  setBooks: (books: BookType[]) => void;
  selectBook: (book: BookType) => void;
  // addAccount: (account: AccountType) => void;
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
    })),
    {
      name: 'book-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useBookStore;
