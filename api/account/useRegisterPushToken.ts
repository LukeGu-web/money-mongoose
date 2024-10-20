import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import log from 'core/logger';

type Variables = {
  token: string;
};
type Response = {
  details: string;
};

const useRegisterPushToken = createMutation<Response, Variables, AxiosError>({
  mutationFn: async () =>
    client({
      url: 'user/register-push-token/',
      method: 'POST',
    }).then((response) => response.data),
  onSuccess: () => {
    log.success('push token registered successfully');
  },
});

export default useRegisterPushToken;
