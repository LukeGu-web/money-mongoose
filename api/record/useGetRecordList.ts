import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import type { Record } from './types';

type Variables = void;
type Response = Record[];

export const useGetRecordList = createQuery<Response, Variables, AxiosError>({
  queryKey: ['records'],
  fetcher: () => {
    return client.get('record/').then((response) => response.data);
  },
});
