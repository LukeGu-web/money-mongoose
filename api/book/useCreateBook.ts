import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import { AssetGroupType } from './types';

type Variables = { name: string; note: string };
type Response = {
  id: number;
  groups: AssetGroupType[];
  name: string;
  note: string;
};

export const useCreateBook = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'book/',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
