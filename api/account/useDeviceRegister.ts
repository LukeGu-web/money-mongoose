import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../client';

type Variables = {
  user: {
    username: string;
    password: string;
  };
  accountStatus: string;
};
type Response = { id: string; accountStatus: string; message: string };

export const useDeviceRegister = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    client({
      url: 'user/device-register/',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
