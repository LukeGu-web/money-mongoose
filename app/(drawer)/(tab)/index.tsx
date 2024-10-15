import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/react/shallow';

import { client, setHeaderToken } from 'api/client';
import { useGetMonthlyData } from 'api/record';
import {
  BudgetCard,
  ExpenseCard,
  RecordList,
  HomeHeader,
  Icon,
} from 'components';
import {
  useUserStore,
  useBookStore,
  useSettingStore,
  useLocalStore,
} from 'core/stateHooks';
import { usePushNotifications } from 'core/features/usePushNotifications';

export default function Home() {
  const { expoPushToken: pushToken } = usePushNotifications();
  const user = useUserStore((state) => state.user);
  const currentBook = useBookStore((state) => state.currentBook);
  const { expoPushToken, setExpoPushToken } = useLocalStore(
    useShallow((state) => ({
      expoPushToken: state.expoPushToken,
      setExpoPushToken: state.setExpoPushToken,
    }))
  );
  const theme = useSettingStore((state) => state).theme;
  const { data } = useGetMonthlyData({
    variables: { book_id: currentBook.id },
  });

  useEffect(() => {
    if (!client.defaults.headers.common['Authorization'])
      setHeaderToken(user.token);

    if (!expoPushToken && pushToken) {
      setExpoPushToken(pushToken.data);
    }
  }, []);

  const monthIncome =
    data && data.length > 0 ? Number(data[0].monthly_income) : 0;
  const monthExpense =
    data && data.length > 0 ? Number(data[0].monthly_expense) : 0;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['top']}
    >
      <HomeHeader />
      <View className='flex-1 gap-2 p-2 bg-white dark:bg-black'>
        <View className='rounded-lg h-36 bg-sky-200 dark:bg-sky-900'>
          <ExpenseCard monthIncome={monthIncome} monthExpense={monthExpense} />
        </View>
        <View className='h-48 bg-blue-200 rounded-lg dark:bg-blue-950'>
          <BudgetCard monthExpense={monthExpense} />
        </View>
        <View className='flex-1 pb-2 rounded-lg bg-zinc-100 dark:bg-zinc-600'>
          <View className='flex-row items-center justify-between p-2'>
            <Text className='text-2xl font-semibold dark:color-white'>
              Last 7 days
            </Text>
            <Pressable
              className='flex-row items-center justify-between gap-1'
              onPress={() => router.navigate('/records')}
            >
              <Text className='dark:color-white'>All records</Text>
              <Icon
                name='double-right'
                size={14}
                color={theme === 'dark' ? 'white' : 'black'}
              />
            </Pressable>
          </View>
          <RecordList
            extra={`&date_after=${dayjs()
              .subtract(7, 'day')
              .format('YYYY-MM-DD')}`}
            noItemMsg='No record in last 7 days'
            loadMore={false}
            bgColor='bg-zinc-100'
            darkBgColor='bg-zinc-600'
          />
        </View>
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
