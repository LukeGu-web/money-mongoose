import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import { AssetType } from '../types';

type Variables = {
  id: number;
};
type Response = {};

const useDeleteAsset = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `asset/${variables.id}/`,
      method: 'DELETE',
      data: variables,
    }).then((response) => response.data),
});

export default useDeleteAsset;
