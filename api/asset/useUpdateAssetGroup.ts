import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { queryClient } from '../api-provider';
import { client } from '../client';
import { AssetType } from '../types';

type Variables = { id: number; name?: string; note?: string };
type Response = {
  id: number;
  assets: AssetType[];
  name: string;
  book: number;
};

const useUpdateAssetGroup = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `asset/group-list/${variables.id}/`,
      method: 'PATCH',
      data: variables,
    }).then((response) => response.data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['assets'],
    });
  },
});

export default useUpdateAssetGroup;
