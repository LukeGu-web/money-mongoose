import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import dayjs from 'dayjs';

import { setHeaderToken } from 'api/client';
import { BudgetCard, ExpenseCard, RecordList } from 'components';
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
      <View className='h-32 rounded-lg bg-sky-200'>
        <ExpenseCard monthIncome={monthIncome} monthExpense={monthExpense} />
      </View>
      <View className='h-48 bg-blue-200 rounded-lg'>
        <BudgetCard monthExpense={monthExpense} />
      </View>
      <View className='flex-1 rounded-lg'>
        <RecordList />
      </View>
      <StatusBar style='light' />
    </View>
  );
}
