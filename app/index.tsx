import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { v4 as uuid } from 'uuid';
import { useDeviceRegister } from 'api/account/useDeviceRegister';
import { useIsFirstTime } from 'core/useIsFirstTime';
import { setItem } from 'core/storage';
import { getToken, setToken } from 'core/token';

export default function Home() {
  const [isFirstTime, setIsFirstTime] = useIsFirstTime();
  const { mutate: registerDevice } = useDeviceRegister();

  useEffect(() => {
    if (isFirstTime) {
      const deviceId = uuid();
      setItem('deviceId', deviceId);
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
            setIsFirstTime(false);
          },
          onError: (error) => {
            console.log('error: ', error);
          },
        }
      );
    } else {
      console.log('stored token', getToken());
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
