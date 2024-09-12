import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { queryClient } from '../api-provider';
import { client } from '../client';

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
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['assets'],
    });
  },
});

export default useDeleteAsset;
