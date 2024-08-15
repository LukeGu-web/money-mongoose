import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import { AssetType } from '../types';

type Variables = {
  name: string;
  group: number;
};
type Response = AssetType;

const useCreateAsset = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'asset/',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});

export default useCreateAsset;
