import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';

type Variables = null;
type Response = {
  details: string;
};

const useVerifyEmail = createMutation<Response, Variables, AxiosError>({
  mutationFn: async () =>
    client({
      url: 'user/send-verify-email/',
      method: 'POST',
    }).then((response) => response.data),
  onSuccess: () => {
    console.log('send verification email successfully');
  },
});

export default useVerifyEmail;
