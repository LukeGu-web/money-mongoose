import Toast from 'react-native-toast-message';

export const successToaster = (message: string) => {
  Toast.show({
    type: 'success',
    text1: message,
  });
};

export const infoToaster = (message: string) => {
  Toast.show({
    type: 'info',
    text1: message,
  });
};
