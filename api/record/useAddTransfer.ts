import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import type { TransferAPI as Transfer } from './types';
import { queryClient } from '../api-provider';

type Variables = Transfer;
type Response = Transfer;

const useAddTransfer = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'record/transfer/',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['records'],
    });
  },
});

export default useAddTransfer;
