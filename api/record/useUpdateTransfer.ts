import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import type { Transfer } from './types';

type Variables = Transfer;
type Response = Transfer;

const useUpdateTransfer = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `record/transfer/${variables.id}/`,
      method: 'PUT',
      data: variables,
    }).then((response) => response.data),
});

export default useUpdateTransfer;
