import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDeviceRegister } from 'api/account/useDeviceRegister';

export default function Home() {
  useEffect(() => {
    handleFirstUse();
  }, []);

  const { mutate: registerDevice, isPending } = useDeviceRegister();

  const handleFirstUse = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value === null) {
        // value previously stored
        registerDevice(
          {
            user: {
              username: 'username2',
              password: 'password',
            },
            accountStatus: 'unregistered',
          },
          {
            onSuccess: (res) => {
              console.log('success: ', res);
            },
            onError: (error) => {
              console.log('error: ', error);
            },
          }
        );
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{uuid()}</Text>
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
