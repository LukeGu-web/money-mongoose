import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import { AssetType } from '../types';

type Variables = {
  name: string;
  book: number;
};
type Response = {
  id: number;
  assets: AssetType[];
  name: string;
  book: number;
};

const useCreateAssetGroup = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'asset/group-list/',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});

export default useCreateAssetGroup;
