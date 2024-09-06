import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';

type Variables = {
  id: number;
  avatar?: string;
  user?: {
    email?: string;
    username?: string;
    password?: string;
  };
  account_status?: string;
};
type Response = any;

const useUpdateUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `user/${variables.id}/`,
      method: 'PATCH',
      data: variables,
    }).then((response) => response.data),
});

export default useUpdateUser;
