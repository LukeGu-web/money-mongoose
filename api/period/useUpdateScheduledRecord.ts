import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { queryClient } from '../api-provider';
import { client } from '../client';
import type { ScheduledRecordType, FrequencyTypes } from './types';

type Variables = {
  id: number;
  frequency?: FrequencyTypes;
  start_date: Date;
  end_date?: Date;
  month_day?: number;
  week_days?: number[];
  num_of_days?: number;
};
type Response = ScheduledRecordType;

const useUpdateScheduledRecord = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    client({
      url: `/record/scheduled/${variables.id}/`,
      method: 'PATCH',
      data: variables,
    }).then((response) => response.data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['scheduled-record'],
    });
  },
});

export default useUpdateScheduledRecord;
