import axios, { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

type Response = any;
type Variables = {
  currency_code: string;
};

const useCurrency = createQuery<Response, Variables, AxiosError>({
  queryKey: ['currencies'],
  fetcher: (variables) =>
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/${process.env.EXPO_PUBLIC_CURRENCY_API_KEY}/latest/${variables.currency_code}`
      )
      .then((response) => response.data),
});

export default useCurrency;
