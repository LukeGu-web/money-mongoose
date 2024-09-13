import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import { queryClient } from '../api-provider';
import type { TransferAPI as Transfer } from './types';

type Variables = Transfer;
type Response = Transfer;

const useUpdateTransfer = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `record/transfer/${variables.id}/`,
      method: 'PUT',
      data: variables,
    }).then((response) => response.data),
  onSuccess: (variables) => {
    queryClient.invalidateQueries({
      queryKey: ['records'],
    });
    if (variables.from_asset || variables.to_asset) {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      });
    }
  },
});

export default useUpdateTransfer;
