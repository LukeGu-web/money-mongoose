import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import { queryClient } from '../api-provider';

type Variables = { id: number };
type Response = {};

const useDeleteRecord = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `record/record/${variables.id}/`,
      method: 'DELETE',
      data: variables,
    }).then((response) => response.data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['records'],
    });
    queryClient.invalidateQueries({
      queryKey: ['assets'],
    });
  },
});

export default useDeleteRecord;
