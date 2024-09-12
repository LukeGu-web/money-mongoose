import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { queryClient } from '../api-provider';
import { client } from '../client';

type Variables = { id: number };
type Response = {};

const useDeleteTransfer = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `record/transfer/${variables.id}/`,
      method: 'DELETE',
      data: variables,
    }).then((response) => response.data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['records'],
    });
  },
});

export default useDeleteTransfer;
