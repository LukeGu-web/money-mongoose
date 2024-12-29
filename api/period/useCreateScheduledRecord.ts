import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { queryClient } from '../api-provider';
import { client } from '../client';
import type { ScheduledRecordType } from './types';

type Variables = ScheduledRecordType;
type Response = ScheduledRecordType;

const useCreateScheduledRecord = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    client({
      url: 'record/scheduled/',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['scheduled-record'],
    });
  },
});

export default useCreateScheduledRecord;
