import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';

type Variables = {
  book_id: number;
  type: 'balance' | 'expense' | 'income';
  timeframe: string;
};
type Response = {
  value: number;
  date: string;
}[];

const useGetTrendDate = createQuery<Response, Variables, AxiosError>({
  queryKey: ['records', 'trend'],
  fetcher: (variables: Variables): Promise<Response> => {
    return client
      .get(
        `/record/trend/?book_id=${variables.book_id}&type=${variables.type}&timeframe=${variables.timeframe}`
      )
      .then((response) => response.data);
  },
});

export default useGetTrendDate;
