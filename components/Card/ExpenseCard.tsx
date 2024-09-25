import { Text, View } from 'react-native';
import dayjs from 'dayjs';
import { formatter } from 'core/utils';

type ExpenseCardProps = {
  monthExpense: number;
  monthIncome: number;
};

export default function ExpenseCard({
  monthExpense,
  monthIncome,
}: ExpenseCardProps) {
  const month = dayjs().format('MMMM');
  const balance = monthIncome + monthExpense;
  return (
    <View className='justify-between flex-1 p-2 '>
      <Text className='text-3xl dark:color-white'>
        {month}
        <Text className='text-xl dark:color-white'>&#183; Expense</Text>
      </Text>
      <Text className='text-4xl dark:color-white'>
        {formatter(Math.abs(monthExpense))}
      </Text>
      <View className='flex-row gap-2'>
        <Text className='font-extrabold dark:color-white'>Income</Text>
        <Text className='font-semibold color-green-700 dark:color-green-200'>
          {formatter(monthIncome)}
        </Text>
        <Text className='font-extrabold dark:color-white'>Balance</Text>
        <Text
          className={`font-semibold ${
            balance > 0
              ? 'color-green-700 dark:color-green-200'
              : 'color-red-700 dark:color-red-200'
          } `}
        >
          {formatter(balance)}
        </Text>
      </View>
    </View>
  );
}
