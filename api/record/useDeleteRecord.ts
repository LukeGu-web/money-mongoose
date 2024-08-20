import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';

type Variables = { id: number };
type Response = {};

const useDeleteRecord = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `record/record/${variables.id}/`,
      method: 'DELETE',
      data: variables,
    }).then((response) => response.data),
});

export default useDeleteRecord;
