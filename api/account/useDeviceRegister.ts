import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client, setHeaderToken } from '../client';
import { AssetGroupType, UserType } from '../types';
import { defaultGroups } from 'api/book/useCreateBook';
import log from 'core/logger';

type Variables = {
  user: {
    username: string;
    password: string;
  };
  account_id: string;
  account_status: string;
  expo_push_token?: string;
};
type Response = {
  id: number;
  groups: AssetGroupType[];
  name: string;
  note: string;
  monthly_goal: null | number;
  token: string;
  account: UserType | null;
};

const defaultBook = {
  name: 'Daily Life',
  note: 'Default book',
};

let token = '',
  account: UserType | null = null;

const useDeviceRegister = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'user/device-register/',
      method: 'POST',
      data: variables,
    })
      .then((response) => {
        account = response.data.account;
        token = response.data.token;
        setHeaderToken(token);
        return client({
          url: 'book/with-groups/',
          method: 'POST',
          data: { ...defaultBook, groups: defaultGroups },
        });
      })
      .then((response) => ({ ...response.data, token, account }))
      .catch((err) => {
        log.error('Error (useDeviceRegister): ', err);
      }),
});

export default useDeviceRegister;
