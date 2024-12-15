import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import dayjs from 'dayjs';
import { useGetMonthlyData } from 'api/record';
import {
  BudgetCard,
  ExpenseCard,
  RecordList,
  HomeHeader,
  Icon,
} from 'components';
import { useBookStore, useSettingStore } from 'core/stateHooks';

export default function Home() {
  const currentBook = useBookStore((state) => state.currentBook);
  const theme = useSettingStore((state) => state).theme;
  const { data } = useGetMonthlyData({
    variables: { book_id: currentBook.id },
  });

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
            <Link
              className='flex-row items-center justify-between gap-1'
              href={'/records'}
            >
              <Text className='dark:color-white'>All records</Text>
              <Icon
                name='double-right'
                size={14}
                color={theme === 'dark' ? 'white' : 'black'}
              />
            </Link>
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
