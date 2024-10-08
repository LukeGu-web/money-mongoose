import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { queryClient } from '../api-provider';
import { client } from '../client';
import { AssetType } from '../types';

type Variables = {
  id: number;
  bill_day?: number;
  repayment_day?: number;
  name?: string;
  balance?: number;
  is_credit?: boolean;
  credit_limit?: number;
  is_total_asset?: boolean;
  is_no_budget?: boolean;
  note?: string;
  group?: number; //asset group id
};
type Response = AssetType;

const useUpdateAsset = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `asset/${variables.id}/`,
      method: 'PATCH',
      data: variables,
    }).then((response) => response.data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['assets'],
    });
  },
});

export default useUpdateAsset;
