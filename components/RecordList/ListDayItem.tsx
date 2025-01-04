import { View, Text } from 'react-native';
import dayjs from 'dayjs';

import { AssetType } from 'api/types';
import { RecordsByDay } from 'api/record/types';
import ListItem from './ListItem';

type ListDayItemProps = {
  item: RecordsByDay;
  flatAssets: AssetType[];
  onPress: () => void;
};

export default function ListDayItem({
  item,
  flatAssets,
  onPress,
}: ListDayItemProps) {
  let formattedDate = dayjs(item.date).format('D MMM YYYY ddd');
  return (
    <View className='p-3 '>
      <View className='flex-row items-center justify-between px-3 py-1 -mx-3 rounded-3xl bg-zinc-300 dark:bg-zinc-500'>
        <Text className='text-lg font-bold dark:color-white'>
          {formattedDate}
        </Text>
        <View className='flex-row gap-2'>
          {item.sum_of_income > 0 && (
            <Text className='font-bold color-green-700 dark:color-green-200'>
              Income: {+item.sum_of_income}
            </Text>
          )}
          {item.sum_of_expense < 0 && (
            <Text className='font-bold color-red-700 dark:color-red-200'>
              Expense: {-item.sum_of_expense}
            </Text>
          )}
        </View>
      </View>
      <View className='flex-1'>
        {item.records.map((record) => (
          <ListItem
            key={`${record.id}`}
            item={record}
            flatAssets={flatAssets}
            onPress={onPress}
          />
        ))}
      </View>
    </View>
  );
}
