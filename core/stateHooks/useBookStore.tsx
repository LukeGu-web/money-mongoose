import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
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
  updateAssetGroup: (assetGroup: AssetGroupType) => void;
  removeAssetGroup: (groupId: number) => void;
};

const useBookStore = create<BookState>()(
  devtools(
    persist(
      immer((set, get) => ({
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
        addAssetGroup: (assetGroup) => {
          set((state) => {
            (state.currentBook as BookType).groups.push(assetGroup);
          });
        },
        updateAssetGroup: (assetGroup) => {
          set((state) => {
            // Update the books array
            const bookIndex = state.books.findIndex(
              (item) => item.id === assetGroup.book
            );
            const groupIndex = state.books[bookIndex].groups.findIndex(
              (item) => item.id === assetGroup.id
            );
            state.books[bookIndex].groups[groupIndex] = assetGroup;
            // Update the currentBook if it matches the updated book
            if (state.currentBook && state.currentBook.id === assetGroup.book) {
              state.currentBook.groups[groupIndex] = assetGroup;
            }
          });
        },
        removeAssetGroup: (groupId) => {
          set((state) => {
            const book = state.currentBook as BookType;
            return {
              currentBook: {
                ...book,
                groups: book.groups.filter((group) => group.id !== groupId),
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
  )
);

export default useBookStore;
