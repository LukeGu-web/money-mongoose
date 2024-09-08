import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client, setHeaderToken } from '../client';

type Variables = { username: string; password: string };
type Response = { token: string };

const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    setHeaderToken(null);
    return client
      .post('user/login/', variables)
      .then((response) => response.data);
  },
});

export default useLogin;
