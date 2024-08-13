import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client, setHeaderToken } from '../client';
import { AssetGroupType } from '../types';

type Variables = {
  user: {
    username: string;
    password: string;
  };
  accountStatus: string;
};
// type Response = { id: string; accountStatus: string; message: string };
type Response = {
  id: number;
  groups: AssetGroupType[];
  name: string;
  note: string;
  token: string;
};

const defaultBook = {
  name: 'Daily Life',
  note: 'Default book',
};

let token = '';

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
    })
      .then((response) => {
        token = response.data.token;
        setHeaderToken(token);
        return client({
          url: 'book/',
          method: 'POST',
          data: defaultBook,
        });
      })
      .then((response) => ({ ...response.data, token }))
      .catch((err) => {
        console.log(err);
      }),
});
