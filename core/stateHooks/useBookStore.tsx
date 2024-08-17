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
  currentBook: { id: number; name: string };
  selectedBook: BookType | null;
  setBooks: (books: BookType[]) => void;
  setCurrentBook: (bookId: number, name: string) => void;
  getCurrentBook: () => BookType | undefined;
  selectBook: (book: BookType | null) => void;
  addBook: (book: BookType) => void;
  updateBook: (book: BookType) => void;
  addAssetGroup: (assetGroup: AssetGroupType) => void;
  updateAssetGroup: (assetGroup: AssetGroupType) => void;
  removeAssetGroup: (groupId: number) => void;
  addAsset: (asset: AssetType) => void;
  updateAsset: (asset: AssetType, originalGroupId?: number) => void;
  removeAsset: (asset: AssetType) => void;
};

const useBookStore = create<BookState>()(
  devtools(
    persist(
      immer((set, get) => ({
        books: [],
        currentBook: { id: -1, name: '' },
        selectedBook: null,
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
                const existingGroup = book.groups[index];
                // Update the fields of the existing group, keeping the current assets intact
                book.groups[index] = {
                  ...existingGroup,
                  ...assetGroup,
                  assets: existingGroup.assets, // Ensure the assets are not overwritten
                };
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
        updateAsset: (asset: AssetType, originalGroupId?: number) => {
          set((state) => {
            const bookIndex = state.books.findIndex(
              (book) => book.id === state.currentBook.id
            );
            // If originalGroupId is provided, remove the asset from the original group
            if (originalGroupId) {
              const originalGroupIndex = state.books[
                bookIndex
              ].groups.findIndex((group) => group.id === originalGroupId);
              // Remove the asset from the original group's assets array
              const removeAsset = [
                ...state.books[bookIndex].groups[originalGroupIndex].assets,
              ];
              state.books[bookIndex].groups[originalGroupIndex].assets =
                removeAsset.filter((a) => a.id !== asset.id);
            }
            // Find the target group (where the asset should be added or updated)
            const targetGroupIndex = state.books[bookIndex].groups.findIndex(
              (group) => group.id === asset.group
            );
            const targetGroup = state.books[bookIndex].groups[targetGroupIndex]; //  the target group
            const assetIndex = targetGroup.assets.findIndex(
              (a) => a.id === asset.id
            );
            if (assetIndex !== -1) {
              // If the asset already exists in the target group, update it
              targetGroup.assets[assetIndex] = asset;
            } else {
              // If the asset does not exist in the target group, add it
              targetGroup.assets.push(asset);
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
      })),
      {
        name: 'book-storage', // unique name
        storage: createJSONStorage(() => AsyncStorage), // Add this here!
      }
    )
  )
);

export default useBookStore;
