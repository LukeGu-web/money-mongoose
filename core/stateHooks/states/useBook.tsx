import { create } from 'zustand';
import { BookType } from 'api/types';

type BookState = {
  book: BookType;
  setSelect: (value: BookType) => void;
  resetBook: () => void;
};
export const defaultValue: BookType = {
  id: -1,
  groups: [],
  name: '',
  note: '',
};

const useBook = create<BookState>((set) => ({
  book: defaultValue,
  setSelect: (value) => {
    set(() => ({ book: value }));
  },
  resetBook: () => {
    set(() => ({
      book: defaultValue,
    }));
  },
}));

export default useBook;
