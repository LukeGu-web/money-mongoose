import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import { PieChartDataType } from 'api/types';

type Response = {
  total_amount: string;
  data: PieChartDataType;
  details: {
    [key: string]: {
      total_amount: string;
      record_count: number;
      percentage: number;
      subcategories: {
        subcategory: string;
        total_amount: string;
        percentage: number;
        record_count: number;
      }[];
    };
  };
};
type Variables = {
  book_id: number;
  type: 'expense' | 'income';
  timeframe: string;
};

const useGetCategoriedRecords = createQuery<Response, Variables, AxiosError>({
  queryKey: ['records', 'category'],
  fetcher: (variables: Variables) =>
    client
      .get(
        `record/category/?book_id=${variables.book_id}&type=${variables.type}&timeframe=${variables.timeframe}`
      )
      .then((response) => response.data),
});

export default useGetCategoriedRecords;
