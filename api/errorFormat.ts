import type { AxiosError } from 'axios';

export const formatApiError = (error: AxiosError) => {
  return {
    status: error.response?.status,
    message: error.response?.data,
  };
};
