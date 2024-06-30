import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { v4 as uuid } from 'uuid';
import { useDeviceRegister } from 'api/account/useDeviceRegister';
import {
  getFistTimeFlag,
  setFistTimeFlag,
} from 'core/localStorage/useIsFirstTime';
import { setItem } from 'core/localStorage/storage';
import { getToken, setToken } from 'core/localStorage/token';
import { setHeaderToken } from 'api/client';
import { formatApiError } from 'api/errorFormat';
import { useStyles, useTheme, TColors } from 'core/theme';
import { BudgetCard, ExpenseCard, RecordList } from 'components';

export default function Home() {
  const { theme, styles } = useStyles(createStyles);
  // TODO: move registerDevice to onboarding page
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
      <View style={styles.expenseContainer}>
        <ExpenseCard />
      </View>
      <View style={styles.budgetContainer}>
        <BudgetCard />
      </View>
      <View style={styles.listContainer}>
        <RecordList />
      </View>
      <StatusBar style='light' />
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      gap: 5,
      padding: 5,
    },
    expenseContainer: {
      height: 120,
      borderRadius: 10,
      backgroundColor: 'powderblue',
    },
    budgetContainer: {
      height: 160,
      borderRadius: 10,
      backgroundColor: 'skyblue',
    },
    listContainer: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: 'steelblue',
    },
  });
