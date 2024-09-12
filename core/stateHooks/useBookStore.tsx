import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookType, AssetGroupType, AssetType } from 'api/types';

type BookState = {
  books: BookType[];
  currentBook: { id: number; name: string };
  initBook: (books: BookType[], bookId: number, name: string) => void;
  setBooks: (books: BookType[]) => void;
  setCurrentBook: (bookId: number, name: string) => void;
  getCurrentBook: () => BookType | undefined;
  addBook: (book: BookType) => void;
  updateBook: (book: BookType) => void;
};

const useBookStore = create<BookState>()(
  devtools(
    persist(
      immer((set, get) => ({
        books: [],
        currentBook: { id: -1, name: '' },
        initBook: (books, bookId, bookName) => {
          set((state) => {
            state.books = books;
            state.currentBook = { id: bookId, name: bookName };
          });
        },
        setBooks: (books) => {
          set((state) => {
            state.books = books;
          });
        },
        setCurrentBook: (bookId, bookName) => {
          set((state) => {
            state.currentBook = { id: bookId, name: bookName };
          });
        },
        getCurrentBook: () => {
          const state = get();
          return state.books.find((b) => b.id === state.currentBook.id);
        },
        addBook: (book) => {
          set((state) => {
            state.books.push(book);
          });
        },
        updateBook: (book) => {
          set((state) => {
            const index = state.books.findIndex((item) => item.id === book.id);
            if (index !== -1) {
              state.books[index] = book; // Directly update the book in the state
            }
          });
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
