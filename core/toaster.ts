import Toast from 'react-native-toast-message';

export const successToaster = (message: string) => {
  Toast.show({
    type: 'success',
    text1: message,
  });
};
