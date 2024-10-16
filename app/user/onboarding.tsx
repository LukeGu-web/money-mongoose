import { ActivityIndicator, View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, Link } from 'expo-router';
import 'react-native-get-random-values'; // for uuid
import { v4 as uuid } from 'uuid';
import { useShallow } from 'zustand/react/shallow';

import { formatApiError } from 'api/errorFormat';
import { useDeviceRegister } from 'api/account';
import { UserType } from 'api/types';
import log from 'core/logger';
import { useBookStore, useLocalStore, useUserStore } from 'core/stateHooks';
import { usePushNotifications } from 'core/features/usePushNotifications';

const welcomeImage = require('../../assets/illustrations/welcome.png');

export default function Onboarding() {
  const { expoPushToken: pushToken } = usePushNotifications();
  const {
    isOnBoarding,
    isAcceptedAgreement,
    setIsOnBoarding,
    setExpoPushToken,
  } = useLocalStore(
    useShallow((state) => ({
      isOnBoarding: state.isOnBoarding,
      isAcceptedAgreement: state.isAcceptedAgreement,
      setIsOnBoarding: state.setIsOnBoarding,
      setExpoPushToken: state.setExpoPushToken,
    }))
  );

  const { setCurrentBook } = useBookStore();

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
        expo_push_token: pushToken?.data,
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
          setCurrentBook(rest);
          setIsOnBoarding(true);
          if (pushToken) setExpoPushToken(pushToken.data);
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
      edges={['right', 'bottom', 'left']}
    >
      <View className='flex-1 py-48 bg-white'>
        <View className='items-center justify-between flex-1 gap-4'>
          <Text className='font-mono text-5xl font-medium text-blue-500'>
            Welcome
          </Text>
          <Image className='w-72 h-72' source={welcomeImage} />
          <View className='items-center w-full gap-6'>
            <Pressable
              className='items-center justify-center w-1/2 p-2 border-2 border-black rounded-3xl'
              onPress={handleStart}
            >
              <Text>Start</Text>
            </Pressable>
            <Link
              href={{ pathname: '/user/register', params: { reason: 'login' } }}
            >
              <Text className='underline color-primary'>Login</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
