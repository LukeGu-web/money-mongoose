import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  devtools,
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookType, AssetGroupType, AssetType } from 'api/types';

type BookState = {
  books: BookType[];
  currentBookId: number;
  selectedBook: BookType | null;
  setBooks: (books: BookType[]) => void;
  setCurrentBookId: (bookId: number) => void;
  getCurrentBook: () => BookType | undefined;
  selectBook: (book: BookType | null) => void;
  addBook: (book: BookType) => void;
  updateBook: (book: BookType) => void;
  addAssetGroup: (assetGroup: AssetGroupType) => void;
  updateAssetGroup: (assetGroup: AssetGroupType) => void;
  removeAssetGroup: (groupId: number) => void;
  addAsset: (asset: AssetType) => void;
  updateAsset: (asset: AssetType) => void;
  removeAsset: (asset: AssetType) => void;
};

const useBookStore = create<BookState>()(
  devtools(
    persist(
      immer(
        subscribeWithSelector((set, get) => ({
          books: [],
          currentBookId: -1,
          selectedBook: null,
          setBooks: (books) => {
            set((state) => {
              state.books = books;
            });
          },
          setCurrentBookId: (bookId) => {
            set((state) => {
              state.currentBookId = bookId;
            });
          },
          getCurrentBook: () => {
            const state = get();
            return state.books.find((b) => b.id === state.currentBookId);
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
              const index = state.books.findIndex(
                (item) => item.id === book.id
              );
              if (index !== -1) {
                state.books[index] = book; // Directly update the book in the state
              }
            });
          },
          addAssetGroup: (assetGroup) => {
            set((state) => {
              const book = state.books.find((b) => b.id === assetGroup.book);
              if (book) {
                book.groups.push(assetGroup);
              }
            });
          },
          updateAssetGroup: (assetGroup) => {
            set((state) => {
              const book = state.books.find((b) => b.id === assetGroup.book);
              if (book) {
                const index = book.groups.findIndex(
                  (g) => g.id === assetGroup.id
                );
                if (index !== -1) {
                  book.groups[index] = assetGroup;
                }
              }
            });
          },
          removeAssetGroup: (groupId) => {
            set((state) => {
              state.books.forEach((book) => {
                book.groups = book.groups.filter((g) => g.id !== groupId);
              });
            });
          },
          addAsset: (asset) => {
            set((state) => {
              const group = state.books
                .flatMap((book) => book.groups)
                .find((g) => g.id === asset.group);
              if (group) {
                group.assets.push(asset);
              }
            });
          },
          updateAsset: (asset) => {
            set((state) => {
              const group = state.books
                .flatMap((book) => book.groups)
                .find((g) => g.id === asset.group);
              if (group) {
                const index = group.assets.findIndex((a) => a.id === asset.id);
                if (index !== -1) {
                  group.assets[index] = asset;
                }
              }
            });
          },
          removeAsset: (asset) => {
            set((state) => {
              const group = state.books
                .flatMap((book) => book.groups)
                .find((g) => g.id === asset.group);
              if (group) {
                group.assets = group.assets.filter((a) => a.id !== asset.id);
              }
            });
          },
        }))
      ),
      {
        name: 'book-storage', // unique name
        storage: createJSONStorage(() => AsyncStorage), // Add this here!
      }
    )
  )
);

export default useBookStore;
