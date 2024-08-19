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
  return (
    <View className='justify-between flex-1 p-2 '>
      <Text className='text-3xl'>
        {month}
        <Text className='text-xl'>&#183; Expense</Text>
      </Text>
      <Text className='text-4xl'>{formatter(Math.abs(monthExpense))}</Text>
      <View className='flex-row gap-2'>
        <Text className='font-extrabold'>Income</Text>
        <Text className='font-semibold color-green-800'>
          {formatter(monthIncome)}
        </Text>
        <Text className='font-extrabold'>Balance</Text>
        <Text className='font-semibold color-red-800'>
          {formatter(monthIncome + monthExpense)}
        </Text>
      </View>
    </View>
  );
}
