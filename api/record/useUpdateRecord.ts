import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import type { Record } from './types';

type Variables = Record;
type Response = Record;

const useUpdateRecord = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `record/record/${variables.id}/`,
      method: 'PUT',
      data: variables,
    }).then((response) => response.data),
});

export default useUpdateRecord;
