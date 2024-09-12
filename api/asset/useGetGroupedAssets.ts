import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '../client';
import { AssetGroupType } from '../types';

type Response = {
  assets: number;
  liabilities: number;
  net_asset: number;
  groups: AssetGroupType[];
};
type Variables = {
  book_id: number;
};

const useGetGroupedAssets = createQuery<Response, Variables, AxiosError>({
  queryKey: ['assets'],
  fetcher: (variables: Variables) =>
    client
      .get(`asset/group-list/?book_id=${variables.book_id}`)
      .then((response) => response.data),
});

export default useGetGroupedAssets;
