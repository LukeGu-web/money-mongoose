import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import dayjs from 'dayjs';

import { setHeaderToken } from 'api/client';
import { BudgetCard, ExpenseCard, RecordList, Icon } from 'components';
import { useLocalStore, useRecordStore } from 'core/stateHooks';

export default function Home() {
  const token = useLocalStore((state) => state.token);
  const records = useRecordStore((state) => state.records);
  useEffect(() => {
    setHeaderToken(token);
  }, []);

  const currentMonth = dayjs().month();
  let n = 0,
    monthIncome = 0,
    monthExpense = 0;
  while (
    dayjs(records[n]?.date).month() === currentMonth &&
    records.length > n
  ) {
    monthIncome += Number(records[n].sum_of_income);
    monthExpense += Number(records[n].sum_of_expense);
    n++;
  }

  return (
    <View className='flex-1 gap-2 p-2 bg-white'>
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
      <StatusBar style='light' />
    </View>
  );
}
