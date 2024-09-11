import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';

type Variables = {
  book_id: number;
};
type Response = {
  month: string;
  monthly_income: string;
  monthly_expense: string;
}[];

const useGetMonthlyData = createQuery<Response, Variables, AxiosError>({
  queryKey: ['records'],
  fetcher: (variables: Variables): Promise<Response> => {
    return client
      .get(`/record/monthly-data/?book_id=${variables.book_id}`)
      .then((response) => response.data);
  },
});

export default useGetMonthlyData;
