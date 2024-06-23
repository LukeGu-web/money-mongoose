import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';

type Variables = { username: string; password: string };
type Response = { token: string };

export const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'user/login/',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
