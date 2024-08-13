import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { client } from '../client';
import { AssetGroupType } from './types';

type Variables = { id: number; name?: string; note?: string };
type Response = {
  id: number;
  groups: AssetGroupType[];
  name: string;
  note: string;
};

const useUpdateBook = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `book/${variables.id}/`,
      method: 'PATCH',
      data: variables,
    }).then((response) => response.data),
});

export default useUpdateBook;
