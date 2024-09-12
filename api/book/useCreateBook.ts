import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { queryClient } from '../api-provider';
import { client } from '../client';
import { BookType } from '../types';

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
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['books'],
    });
  },
});

export default useCreateBook;
