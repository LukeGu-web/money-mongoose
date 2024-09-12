import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { queryClient } from '../api-provider';
import { client } from '../client';

type Variables = { id: number };
type Response = {};

const useDeleteAssetGroup = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `asset/group-list/${variables.id}/`,
      method: 'DELETE',
    }).then((response) => response.data),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['assets'],
    });
  },
});

export default useDeleteAssetGroup;
