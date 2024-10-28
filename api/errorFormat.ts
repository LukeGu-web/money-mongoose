import type { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';

export const formatApiError = (error: AxiosError) => {
  Toast.show({
    type: 'error',
    // @ts-ignore: ignore type
    text1: String(error.response?.data.error),
  });
  return {
    status: error.response?.status,
    // @ts-ignore: ignore type
    message: error.response?.data.error,
  };
};
