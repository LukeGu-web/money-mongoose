import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { queryClient } from '../api-provider';
import { client } from '../client';

type Variables = { id: number };
type Response = {};

const useDeleteBook = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `book/${variables.id}/`,
      method: 'DELETE',
    }).then((response) => response.data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['books'],
    });
  },
});

export default useDeleteBook;
