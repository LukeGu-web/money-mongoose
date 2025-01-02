import { View, Text, Pressable } from 'react-native';
import dayjs from 'dayjs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import allCategories from 'static/categories.json';
import Icon from '../Icon/CIcon';

import { AssetType } from 'api/types';
import { RecordTypes } from 'api/record/types';
import { ScheduledRecordResponseType, FrequencyTypes } from 'api/period/types';
import { useScheduledRecord, useSettingStore } from 'core/stateHooks';
import { formatAsset } from 'core/utils';

import monthdays from 'static/monthdays.json';
import weekdays from 'static/weekdays.json';

type ListItemProps = {
  item: ScheduledRecordResponseType;
  flatAssets: AssetType[];
  onPress: () => void;
};

const bgColorMap = {
  expense: 'bg-red-100 dark:bg-red-800',
  income: 'bg-green-100 dark:bg-green-800',
};

const textColorMap = {
  expense: 'color-red-700 dark:color-red-200',
  income: 'color-green-700 dark:color-green-200',
};

const statusColorMap = {
  active: 'bg-green-600 dark:bg-green-200',
  paused: 'bg-red-600 dark:bg-red-200',
  completed: 'bg-blue-600 dark:bg-blue-200',
};

const frequencyText = ({
  frequency,
  num_of_days,
  week_days,
  month_day,
}: {
  frequency: FrequencyTypes;
  num_of_days?: number;
  week_days?: number[];
  month_day?: number;
}) => {
  switch (frequency) {
    case FrequencyTypes.DAILY:
      return `every ${num_of_days! > 1 ? num_of_days + ' days' : 'day'}`;
    case 'weekly':
      return `every ${weekdays[week_days![0] as number]}`;
    case 'monthly':
      return `${monthdays[month_day! - 1]} of each month`;
    case FrequencyTypes.ANNUALLY:
      return 'Every year';
  }
};

export default function ListItem({ item, flatAssets, onPress }: ListItemProps) {
  const setScheduledRecord = useScheduledRecord(
    (state) => state.setScheduledRecord
  );
  const theme = useSettingStore((state) => state.theme);

  const handlePress = () => {
    setScheduledRecord(item as any);
    onPress();
  };

  return (
    <Pressable
      className={`p-4 mt-4 gap-4 rounded-lg ${bgColorMap[item.type]}`}
      onPress={handlePress}
    >
      <View className='flex-row items-center justify-between'>
        <View className='flex-row flex-1 gap-2'>
          <View className='items-start justify-center w-1/6'>
            {!allCategories.includes(item.category) ? (
              <Entypo
                name='new'
                size={28}
                color={theme === 'dark' ? 'white' : 'black'}
              />
            ) : (
              <Icon
                // @ts-ignore: ignore json type
                name={`c-${item.category}`}
                size={28}
                color={theme === 'dark' ? 'white' : 'black'}
              />
            )}
            {item.is_marked_tax_return && (
              <MaterialCommunityIcons
                className='absolute -bottom-2 -left-2'
                name='star'
                size={14}
                color='#d97706'
              />
            )}
          </View>
          <View className='flex-1'>
            <View className='flex-row'>
              <Text className='pb-1 text-lg font-bold dark:color-white'>
                {item.category}
              </Text>
              {item.subcategory && (
                <Text className='pb-1 text-lg dark:color-white'>
                  {' - ' + item.subcategory}
                </Text>
              )}
            </View>
            <Text className='dark:color-white'>{item.note}</Text>
            <View
              className={`w-1/2 pt-2 mb-2 border-b-2 ${
                item.type === RecordTypes.EXPENSE
                  ? 'border-red-700'
                  : 'border-green-700'
              }`}
            />
            <Text className='dark:color-white'>
              {'period: ' +
                frequencyText({
                  frequency: item.frequency as FrequencyTypes,
                  num_of_days: item.num_of_days,
                  week_days: item.week_days,
                  month_day: item.month_day,
                })}
            </Text>

            <Text className='pt-1 dark:color-white'>
              generated {item.execution_count} record
              {item.execution_count > 1 && 's'}
            </Text>
          </View>
        </View>
        <View>
          <Text
            className={`font-bold dark:color-white ${textColorMap[item.type]}`}
          >
            {Number(item.amount).toFixed(2)}
          </Text>
          <Text className='text-sm text-right dark:color-white'>
            {formatAsset(Number(item.asset), flatAssets, true)}
          </Text>
        </View>
      </View>
      <View
        style={{ borderTopWidth: 1 }}
        className='flex-row items-center justify-between pt-2 border-gray-400'
      >
        <Text className='text-xs dark:color-white'>
          {'Next record will be generated on ' +
            dayjs(item.next_occurrence).format('DD/MM/YYYY(ddd)')}
        </Text>
        <View
          className={`items-center justify-center px-1 pb-0.5 rounded-lg ${
            statusColorMap[item.status]
          }`}
        >
          <Text className='text-xs color-white'>{item.status}</Text>
        </View>
      </View>
    </Pressable>
  );
}
