import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { keepPreviousData } from '@tanstack/react-query';
import { client } from '../client';
import type { RecordsByDay } from './types';

type Variables = {
  book_id: number;
  page: number;
  extra: string;
};
type Response = {
  count: number;
  next: null | number;
  previous: null | number;
  results: RecordsByDay[];
};

const useGetAllRecords = createQuery<Response, Variables, AxiosError>({
  queryKey: ['records'],
  fetcher: (variables: Variables): Promise<Response> => {
    return client
      .get(
        `/record/combined/?book_id=${variables.book_id}&page=${variables.page}${variables.extra}`
      )
      .then((response) => response.data);
  },
  placeholderData: keepPreviousData,
});

export default useGetAllRecords;

// extra
// &start_date=${variables.start_date}&end_date=${variables.end_date}&group_by_date=${variables.group_by_date}&is_decreasing=${variables.is_decreasing
// date formate '2024-06-29'
