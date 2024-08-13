import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';

type Variables = { id: number };
type Response = {};

const useDeleteAssetGroup = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `asset/group-list/${variables.id}/`,
      method: 'DELETE',
    }).then((response) => response.data),
});

export default useDeleteAssetGroup;
