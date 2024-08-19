import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import type { RecordsByDay } from './types';
import { useBookStore } from 'core/stateHooks';

type Variables = {
  book_id: number;
  start_date: string; //'2024-06-29'
  end_date: string;
  group_by_date?: boolean;
  is_decreasing?: boolean;
};
type Response = RecordsByDay[];

const useGetAllRecords = createQuery<Response, Variables, AxiosError>({
  queryKey: ['records'],
  fetcher: (variables: Variables): Promise<Response> => {
    return client
      .get(
        `/record/all/?book_id=${variables.book_id}&start_date=${variables.start_date}&end_date=${variables.end_date}&group_by_date=${variables.group_by_date}&is_decreasing=${variables.is_decreasing}`
      )
      .then((response) => response.data);
  },
});

export default useGetAllRecords;
