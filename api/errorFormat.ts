import type { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';

export const formatApiError = (error: AxiosError) => {
  Toast.show({
    type: 'error',
    text1: String(error.response?.data),
  });
  return {
    status: error.response?.status,
    message: error.response?.data,
  };
};
