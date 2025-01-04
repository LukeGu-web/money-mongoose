import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import log from 'core/logger';

type Variables = void;
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
    log.success('Send verification email successfully');
  },
});

export default useVerifyEmail;
