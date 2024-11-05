import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';

type Variables = {
  id: number;
};
type Response = any;

const useDeleteUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `user/${variables.id}/`,
      method: 'DELETE',
      data: variables,
    }).then((response) => response.data),
});

export default useDeleteUser;
