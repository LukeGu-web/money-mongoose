import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client, setHeaderToken } from '../client';
import { OAuthProviderTypes } from '../types';
import { queryClient } from '../api-provider';
import { useBookStore, useUserStore } from 'core/stateHooks';
import { LocalUserType } from 'core/stateHooks/useUserStore';
import log from 'core/logger';

type Variables = {
  provider: OAuthProviderTypes;
  accessToken: string;
  account_id: string;
};
type Response = LocalUserType;

const useOAuthLogin = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setCurrentBook = useBookStore((state) => state.setCurrentBook);
  return createMutation<Response, Variables, AxiosError>({
    mutationFn: async (variables) => {
      setHeaderToken(null);
      return client({
        url: `user/auth/${variables.provider}/`,
        method: 'POST',
        data: {
          accessToken: variables.accessToken,
          account_id: variables.account_id,
        },
      }).then((response) => {
        setHeaderToken(response.data.token);
        setUser(response.data);
        return response.data;
      });
    },
    onSuccess: async () => {
      log.success(`OAuth sign in successfully`);
      const booksData = await queryClient.fetchQuery({
        queryKey: ['books'],
        queryFn: () => client.get('book/').then((response) => response.data),
      });
      if (booksData && booksData.length > 0) {
        setCurrentBook(booksData[0]);
      }
    },
  })();
};

export default useOAuthLogin;
