import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookType, AssetGroupType, AssetType } from 'api/types';

type BookState = {
  books: BookType[];
  currentBook: { id: number; name: string };
  setBooks: (books: BookType[]) => void;
  setCurrentBook: (bookId: number, name: string) => void;
  getCurrentBook: () => BookType | undefined;
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
      immer((set, get) => ({
        books: [],
        currentBook: { id: -1, name: '' },
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
        updateAsset: (asset: AssetType) => {
          set((state) => {
            const bookIndex = state.books.findIndex(
              (book) => book.id === state.currentBook.id
            );

            let originalGroupIndex = -1,
              targetGroupIndex = -1,
              originalAssetIndex = -1;

            state.books[bookIndex].groups.forEach((group, index) => {
              const assetIndex = group.assets.findIndex(
                (a) => a.id === asset.id
              );
              // Find the target group
              if (group.id === asset.group) {
                targetGroupIndex = index;
                const targetAssetIndex = group.assets.findIndex(
                  (a) => a.id === asset.id
                );
                if (targetAssetIndex !== -1) {
                  // If the asset already exists in the target group, update it
                  group.assets[targetAssetIndex] = asset;
                } else {
                  // If the asset does not exist in the target group, add it
                  group.assets.push(asset);
                }
              }
              // Find index of the original group and the original asset
              if (assetIndex !== -1) {
                originalGroupIndex = index;
                originalAssetIndex = assetIndex;
              }
            });
            // if the original group are different with target group, then remove the asset from it
            if (originalGroupIndex !== targetGroupIndex) {
              state.books[bookIndex].groups[originalGroupIndex].assets.splice(
                originalAssetIndex,
                1
              );
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
