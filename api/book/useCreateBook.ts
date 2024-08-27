import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import { AssetGroupType, BookType } from '../types';

type Variables = {
  name: string;
  note: string;
};
type Response = BookType;

export const defaultGroups = [
  { name: 'Saving' },
  { name: 'Credit' },
  { name: 'Investment' },
];

const useCreateBook = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'book/with-groups/',
      method: 'POST',
      data: { ...variables, groups: defaultGroups },
    }).then((response) => response.data),
});

export default useCreateBook;
