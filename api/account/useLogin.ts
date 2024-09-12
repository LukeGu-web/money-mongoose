import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client, setHeaderToken } from '../client';
import { queryClient } from '../api-provider';
import { useBookStore, useUserStore } from 'core/stateHooks';

type Variables = { username: string; password: string };
type Response = { token: string };

const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setCurrentBook = useBookStore((state) => state.setCurrentBook);

  return createMutation<Response, Variables, AxiosError>({
    mutationFn: async (variables) => {
      setHeaderToken(null);
      return client.post('user/login/', variables).then((response) => {
        setHeaderToken(response.data.token);
        return response.data;
      });
    },
    onSuccess: async (response) => {
      const userDetails = await queryClient.fetchQuery({
        queryKey: ['userDetails'],
        queryFn: () =>
          client.get('user/details/').then((response) => response.data),
      });
      if (userDetails) {
        setUser({
          id: userDetails.id,
          account_id: userDetails.account_id,
          avatar: userDetails.avatar,
          nickname: userDetails.nickname,
          account_status: userDetails.account_status,
          email: userDetails.user.email,
          date_joined: userDetails.user.date_joined,
          token: response.token,
        });
      }
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

export default useLogin;
