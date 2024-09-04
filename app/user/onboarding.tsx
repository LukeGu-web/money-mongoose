import { ActivityIndicator, View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import 'react-native-get-random-values'; // for uuid
import { v4 as uuid } from 'uuid';
import { useShallow } from 'zustand/react/shallow';

import { formatApiError } from 'api/errorFormat';
import { useDeviceRegister } from 'api/account';
import { UserType } from 'api/types';
import log from 'core/logger';
import { useBookStore, useLocalStore, useUserStore } from 'core/stateHooks';

const avatarImage = require('../../assets/icon.png');

export default function Onboarding() {
  const { isOnBoarding, isAcceptedAgreement, setIsOnBoarding } = useLocalStore(
    useShallow((state) => ({
      isOnBoarding: state.isOnBoarding,
      isAcceptedAgreement: state.isAcceptedAgreement,
      setIsOnBoarding: state.setIsOnBoarding,
    }))
  );

  const { setBooks, setCurrentBook } = useBookStore(
    useShallow((state) => ({
      setBooks: state.setBooks,
      setCurrentBook: state.setCurrentBook,
    }))
  );

  const setUser = useUserStore((state) => state.setUser);

  if (!isAcceptedAgreement) {
    return <Redirect href='/user/agreement' />;
  }

  const { mutate: registerDevice, isPending } = useDeviceRegister();

  const handleStart = () => {
    const deviceId = uuid();
    registerDevice(
      {
        user: {
          username: deviceId,
          password: deviceId,
        },
        account_id: deviceId,
        account_status: 'unregistered',
      },
      {
        onSuccess: (response) => {
          log.success('Complete onboarding process: ', response);
          const { account, token, ...rest } = response;
          const { user, ...accountRest } = account as UserType;
          setUser({
            ...accountRest,
            token,
            email: user.email,
            date_joined: user.date_joined,
          });
          setBooks([rest]);
          setCurrentBook(rest.id, rest.name);
          setIsOnBoarding(true);
        },
        onError: (error) => {
          log.error('Error: ', formatApiError(error));
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
          <Pressable
            className='items-center justify-center w-1/2 p-2 border-2 border-black rounded-3xl'
            onPress={handleStart}
          >
            <Text>Start</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
