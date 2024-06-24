import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import type { Record, RecordVariables } from './types';

type Variables = RecordVariables;
type Response = Record;

export const useAddRecord = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'record/',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
