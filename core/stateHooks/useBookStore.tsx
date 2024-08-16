import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookType, AssetGroupType, AssetType } from 'api/types';

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
  addAsset: (asset: AssetType) => void;
  updateAsset: (asset: AssetType) => void;
  removeAsset: (asset: AssetType) => void;
};

const useBookStore = create<BookState>()(
  devtools(
    persist(
      immer((set) => ({
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
            const currentBook = state.currentBook;

            if (!currentBook) return; // Ensure currentBook exists

            // Add the asset group to currentBook
            currentBook.groups.push(assetGroup);

            // Update the corresponding book in the books array
            const bookIndex = state.books.findIndex(
              (book) => book.id === currentBook.id
            );
            if (bookIndex !== -1) {
              state.books[bookIndex].groups = [...currentBook.groups];
            }
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
            state.books.forEach((book) => {
              const groupIndex = book.groups.findIndex(
                (group) => group.id === groupId
              );
              if (groupIndex !== -1) {
                book.groups.splice(groupIndex, 1); // Remove the group from the array
                (state.currentBook as BookType).groups.splice(groupIndex, 1); // Update currentBook if it contains the group to be removed
              }
            });
          });
        },
        addAsset: (asset) => {
          set((state) => {
            // Find the group where the asset should be added
            const bookIndex = state.books.findIndex((book) =>
              book.groups.some((group) => group.id === asset.group)
            );
            if (bookIndex === -1) return; // Group not found

            const groupIndex = state.books[bookIndex].groups.findIndex(
              (group) => group.id === asset.group
            );

            // Ensure the asset does not already exist in any other group
            state.books.forEach((book) => {
              book.groups.forEach((group) => {
                group.assets = group.assets.filter((a) => a.id !== asset.id);
              });
            });

            // Add the asset to the correct group
            state.books[bookIndex].groups[groupIndex].assets.push(asset);
            // Update currentBook
            (state.currentBook as BookType).groups[groupIndex].assets.push(
              asset
            );
          });
        },
        updateAsset: (asset) => {
          set((state) => {
            const currentBook = state.currentBook;
            if (!currentBook) return; // Ensure currentBook exists
            // Step 1: Find the original group and remove the asset from it
            let originalGroupIndex = -1;
            currentBook.groups.forEach((group, index) => {
              const assetIndex = group.assets.findIndex(
                (a) => a.id === asset.id
              );
              if (assetIndex !== -1) {
                originalGroupIndex = index;
                group.assets.splice(assetIndex, 1); // Remove the asset from the original group
              }
            });
            // Step 2: Find the target group and add the asset to it
            const targetGroupIndex = currentBook.groups.findIndex(
              (group) => group.id === asset.group
            );
            if (targetGroupIndex !== -1) {
              currentBook.groups[targetGroupIndex].assets.push(asset);
            }
            // Step 3: Update the books array
            const bookIndex = state.books.findIndex(
              (book) => book.id === currentBook.id
            );
            if (bookIndex !== -1) {
              state.books[bookIndex].groups[originalGroupIndex].assets = [
                ...currentBook.groups[originalGroupIndex].assets,
              ];
              state.books[bookIndex].groups[targetGroupIndex].assets = [
                ...currentBook.groups[targetGroupIndex].assets,
              ];
            }
          });
        },
        removeAsset: (asset) => {
          set((state) => {
            // Find and remove the asset from its group in books
            state.books.forEach((book) => {
              book.groups.forEach((group) => {
                group.assets = group.assets.filter((a) => a.id !== asset.id);
              });
            });

            // Remove the asset from the currentBook if it exists there
            if (state.currentBook) {
              state.currentBook.groups.forEach((group) => {
                group.assets = group.assets.filter((a) => a.id !== asset.id);
              });
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
