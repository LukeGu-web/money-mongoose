import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client, setHeaderToken } from '../client';
import { OAuthProviderTypes } from '../types';
import { LocalUserType } from 'core/stateHooks/useUserStore';
import log from 'core/logger';

type Variables = {
  provider: OAuthProviderTypes;
  accessToken: string;
  account_id: string;
};
type Response = LocalUserType;

const useOAuthLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    setHeaderToken(null);
    return client({
      url: `user/auth/${variables.provider}`,
      method: 'POST',
      data: {
        accessToken: variables.accessToken,
        account_id: variables.account_id,
      },
    }).then((response) => response.data);
  },
  onSuccess: () => {
    log.success(`OAuth sign in successfully`);
  },
});

export default useOAuthLogin;
