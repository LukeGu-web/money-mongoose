import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import type { ScheduledRecordResponseType } from './types';

type Variables = void;
type Response = ScheduledRecordResponseType[];

const useGetScheduledRecordList = createQuery<Response, Variables, AxiosError>({
  queryKey: ['scheduled-record'],
  fetcher: () =>
    client.get(`/record/scheduled/`).then((response) => response.data),
});

export default useGetScheduledRecordList;
