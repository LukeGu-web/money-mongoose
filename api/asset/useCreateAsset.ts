import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import { AssetType } from '../types';

type Variables = {
  name: string;
  group: number;
  bill_day?: number;
  repayment_day?: number;
  balance?: number;
  is_credit?: boolean;
  credit_limit?: number;
  is_total_asset?: boolean;
  is_no_budget?: boolean;
  note?: string;
};
type Response = AssetType;

const useCreateAsset = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'asset/',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});

export default useCreateAsset;
