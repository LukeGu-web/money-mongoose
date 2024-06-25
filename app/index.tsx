import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { v4 as uuid } from 'uuid';
import { useDeviceRegister } from 'api/account/useDeviceRegister';
import { getFistTimeFlag, setFistTimeFlag } from 'core/useIsFirstTime';
import { setItem, getItem } from 'core/storage';
import { getToken, setToken } from 'core/token';
import { useRecordList } from 'core/useRecordList';
import RecordList from 'components/RecordList/RecordList';

export default function Home() {
  const records = useRecordList((state) => state.records);
  const { mutate: registerDevice } = useDeviceRegister();

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
              setFistTimeFlag();
            },
            onError: (error) => {
              console.log('error: ', error);
            },
          }
        );
      } else {
        const token = await getToken();
        console.log('stored token', token);
      }
    })();
  }, []);

  console.log('records: ', records);

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      {records.length === 0 ? (
        <Text>You don't have any record.</Text>
      ) : (
        <RecordList />
        // records.map((record, index) => (
        //   <Text key={`${record.category}_${index}`}>{record.category} </Text>
        // ))
      )}
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
