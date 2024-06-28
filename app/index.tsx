import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { v4 as uuid } from 'uuid';
import { useDeviceRegister } from 'api/account/useDeviceRegister';
import {
  getFistTimeFlag,
  setFistTimeFlag,
} from 'core/localStorage/useIsFirstTime';
import { setItem, getItem } from 'core/localStorage/storage';
import { getToken, setToken } from 'core/localStorage/token';
import { useRecordList } from 'core/stateHooks/useRecordList';
import RecordList from 'components/RecordList/RecordList';
import { setHeaderToken } from 'api/client';
import { formatApiError } from 'api/errorFormat';

export default function Home() {
  const records = useRecordList((state) => state.records);
  const { mutate: registerDevice, isPending } = useDeviceRegister();

  useEffect(() => {
    (async function handleFirstTime() {
      const isFirstTime = await getFistTimeFlag();
      console.log('isFirstTime: ', isFirstTime);

      if (isFirstTime === undefined) {
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
              setHeaderToken(response.token);
              setFistTimeFlag();
            },
            onError: (error) => {
              console.log('error: ', formatApiError(error));
            },
          }
        );
      } else {
        const token = await getToken();
        if (token) setHeaderToken(token);
        console.log('stored token', token);
      }
    })();
  }, []);

  if (isPending) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={styles.container}>
      <RecordList />
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
