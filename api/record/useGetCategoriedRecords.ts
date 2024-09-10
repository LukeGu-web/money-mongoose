import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import { PieChartDataType } from 'api/types';

type InnerType = {
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
      };
    }[];
  };
};

type Response = {
  expense?: InnerType;
  income?: InnerType;
};
type Variables = void;

const useGetCategoriedRecords = createQuery<Response, Variables, AxiosError>({
  queryKey: ['records'],
  fetcher: () =>
    client.get('record/category/').then((response) => response.data),
});

export default useGetCategoriedRecords;
