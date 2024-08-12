import {
  ActivityIndicator,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import 'react-native-get-random-values'; // for uuid
import { v4 as uuid } from 'uuid';
import { useShallow } from 'zustand/react/shallow';

import { formatApiError } from 'api/errorFormat';
import { useDeviceRegister } from 'api/account/useDeviceRegister';
import { useBookStore, useLocalStore } from 'core/stateHooks';

const avatarImage = require('../assets/icon.png');

export default function Onboarding() {
  const {
    isOnBoarding,
    isAcceptedAgreement,
    setDeviceId,
    setToken,
    setIsOnBoarding,
  } = useLocalStore(
    useShallow((state) => ({
      isOnBoarding: state.isOnBoarding,
      isAcceptedAgreement: state.isAcceptedAgreement,
      setDeviceId: state.setDeviceId,
      setToken: state.setToken,
      setIsOnBoarding: state.setIsOnBoarding,
    }))
  );

  const { setBooks, setCurrentBook } = useBookStore(
    useShallow((state) => ({
      setBooks: state.setBooks,
      setCurrentBook: state.setCurrentBook,
    }))
  );

  if (!isAcceptedAgreement) {
    return <Redirect href='/agreement' />;
  }

  const { mutate: registerDevice, isPending } = useDeviceRegister();

  const handleStart = () => {
    const deviceId = uuid();
    setDeviceId(deviceId);
    registerDevice(
      {
        user: {
          username: deviceId,
          password: deviceId,
        },
        accountStatus: 'unregistered',
      },
      {
        onSuccess: (response) => {
          console.log('success: ', response);
          const { token, ...rest } = response;
          setToken(response.token);
          setBooks([rest]);
          setCurrentBook(rest);
          setIsOnBoarding(true);
        },
        onError: (error) => {
          console.log('error: ', formatApiError(error));
        },
      }
    );
  };

  if (isPending) {
    return (
      <View className='items-center justify-center flex-1 gap-4 bg-white'>
        <ActivityIndicator size='large' />
        <Text>Preparing data for you</Text>
      </View>
    );
  }

  if (isOnBoarding) {
    return <Redirect href='/' />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'bottom', 'left']}>
      <View className='flex-1 py-48'>
        <View className='items-center justify-between flex-1 gap-4'>
          <Text className='text-6xl text-blue-500'>Welcome</Text>
          <Image className='w-32 h-32' source={avatarImage} />
          <TouchableOpacity
            className='items-center justify-center w-1/2 p-2 border-2 border-black rounded-3xl'
            onPress={handleStart}
          >
            <Text>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
