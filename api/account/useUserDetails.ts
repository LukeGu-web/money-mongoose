import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';

type Response = {
  id: number;
  avatar?: string;
  account_id?: string;
  user: {
    date_joined: string;
    email?: string;
    username?: string;
    password?: string;
  };
  account_status?: string;
  nickname?: string;
};
type Variables = void;

const useUserDetails = createQuery<Response, Variables, AxiosError>({
  queryKey: ['userDetails'],
  fetcher: () => client.get('user/details/').then((response) => response.data),
});

export default useUserDetails;
