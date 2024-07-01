import { View, Text, Button, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import 'react-native-get-random-values'; // for uuid
import { v4 as uuid } from 'uuid';
import { useShallow } from 'zustand/react/shallow';

import { setHeaderToken } from 'api/client';
import { formatApiError } from 'api/errorFormat';
import { useDeviceRegister } from 'api/account/useDeviceRegister';
import { useLocalStore } from 'core/stateHooks';

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
          setToken(response.token);
          setHeaderToken(response.token);
          setIsOnBoarding(true);
        },
        onError: (error) => {
          console.log('error: ', formatApiError(error));
        },
      }
    );
  };

  if (isPending) {
    return <Text>Loading</Text>;
  }

  if (isOnBoarding) {
    return <Redirect href='/' />;
  }

  return (
    <View style={styles.container}>
      <Text>On boarding</Text>
      <Button title='start' onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
