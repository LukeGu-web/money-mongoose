import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookType, AssetGroupType } from 'api/types';

type BookState = {
  books: BookType[];
  currentBook: BookType | null;
  selectedBook: BookType | null;
  setBooks: (books: BookType[]) => void;
  setCurrentBook: (book: BookType) => void;
  selectBook: (book: BookType | null) => void;
  addBook: (book: BookType) => void;
  updateBook: (book: BookType) => void;
  addAssetGroup: (assetGroup: AssetGroupType) => void;
};

const useBookStore = create<BookState>()(
  persist(
    devtools((set) => ({
      books: [],
      currentBook: null,
      selectedBook: null,
      setBooks: (books) => {
        set(() => ({ books }));
      },
      setCurrentBook: (book) => {
        set(() => ({ currentBook: book }));
      },
      selectBook: (book) => {
        set(() => ({ selectedBook: book }));
      },
      addBook: (book) => {
        set((state) => ({ books: [...state.books, book] }));
      },
      updateBook: (book) => {
        set((state) => {
          const index = state.books.findIndex((item) => item.id === book.id);
          const newBooks = [...state.books];
          newBooks[index] = book;
          return { books: newBooks };
        });
      },
      addAssetGroup: (assetGroup) => {
        set((state) => {
          const book = state.currentBook as BookType;
          return {
            currentBook: {
              ...book,
              groups: [...book.groups, assetGroup],
            },
          };
        });
      },
    })),
    {
      name: 'book-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useBookStore;
