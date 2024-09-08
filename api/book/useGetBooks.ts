import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import { BookType } from 'api/types';

type Response = BookType[];
type Variables = void;

const useGetBooks = createQuery<Response, Variables, AxiosError>({
  queryKey: ['books'],
  fetcher: () => client.get('book/').then((response) => response.data),
});

export default useGetBooks;
