import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import type { RecordAPI as Record } from './types';
import { queryClient } from '../api-provider';

type Variables = Record;
type Response = Record;

const useAddRecord = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'record/record/',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
  onSuccess: (variables) => {
    queryClient.invalidateQueries({
      queryKey: ['records'],
    });
    if (variables.asset) {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      });
    }
  },
});

export default useAddRecord;
