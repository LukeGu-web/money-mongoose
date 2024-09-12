import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import { AssetType } from '../types';

type Response = AssetType[];
type Variables = {
  book_id: number;
};

const useGetFlatAssets = createQuery<Response, Variables, AxiosError>({
  queryKey: ['assets', 'flat'],
  fetcher: (variables: Variables) =>
    client
      .get(`asset/?book_id=${variables.book_id}`)
      .then((response) => response.data),
});

export default useGetFlatAssets;
