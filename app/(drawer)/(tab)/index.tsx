import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import dayjs from 'dayjs';

import { client, setHeaderToken } from 'api/client';
import { useGetMonthlyData } from 'api/record';
import {
  BudgetCard,
  ExpenseCard,
  RecordList,
  HomeHeader,
  Icon,
} from 'components';
import { useUserStore, useBookStore } from 'core/stateHooks';

export default function Home() {
  const user = useUserStore((state) => state.user);
  const currentBook = useBookStore((state) => state.currentBook);
  const { data } = useGetMonthlyData({
    variables: { book_id: currentBook.id },
  });
  useEffect(() => {
    if (!client.defaults.headers.common['Authorization'])
      setHeaderToken(user.token);
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
        <View className='rounded-lg h-36 bg-sky-200'>
          <ExpenseCard monthIncome={monthIncome} monthExpense={monthExpense} />
        </View>
        <View className='h-48 bg-blue-200 rounded-lg'>
          <BudgetCard monthExpense={monthExpense} />
        </View>
        <View className='flex-1 rounded-lg bg-zinc-100'>
          <View className='flex-row items-center justify-between p-2'>
            <Text className='text-2xl font-semibold'>Last 7 days</Text>
            <Pressable
              className='flex-row items-center justify-between gap-1'
              onPress={() => router.navigate('/records')}
            >
              <Text>All records</Text>
              <Icon name='double-right' size={14} color='black' />
            </Pressable>
          </View>
          <RecordList
            extra={`&date_after=${dayjs()
              .subtract(7, 'day')
              .format('YYYY-MM-DD')}`}
            noItemMsg='No record in last 7 days'
            loadMore={false}
            bgColor='bg-zinc-100'
          />
        </View>
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
