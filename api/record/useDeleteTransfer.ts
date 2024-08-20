import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
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
});

export default useDeleteTransfer;
