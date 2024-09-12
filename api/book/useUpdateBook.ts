import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import { queryClient } from '../api-provider';
import { BookType } from '../types';

type Variables = {
  id: number;
  name?: string;
  note?: string;
  monthly_goal?: number;
};
type Response = BookType;

const useUpdateBook = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `book/${variables.id}/`,
      method: 'PATCH',
      data: variables,
    }).then((response) => response.data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['books'],
    });
  },
});

export default useUpdateBook;
