import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import type { ScheduledRecordDetailsType } from './types';

type Variables = {
  id: number;
};
type Response = ScheduledRecordDetailsType;

const useGetScheduledRecordDetails = createQuery<
  Response,
  Variables,
  AxiosError
>({
  queryKey: ['scheduled-record', 'details'],
  fetcher: (variables: Variables) =>
    client
      .get(`/record/scheduled/${variables.id}/`)
      .then((response) => response.data),
});

export default useGetScheduledRecordDetails;
