import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';

type Response = {
  id: number;
  avatar?: string;
  user?: {
    email?: string;
    username?: string;
    password?: string;
  };
  account_status?: string;
};
type Variables = void;

const useUserDetails = createQuery<Response, Variables, AxiosError>({
  queryKey: ['userDetails'],
  fetcher: () => client.get('user/details/').then((response) => response.data),
});

export default useUserDetails;
