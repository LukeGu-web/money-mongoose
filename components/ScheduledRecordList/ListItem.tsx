import { View, Text, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import allCategories from 'static/categories.json';
import Icon from '../Icon/CIcon';

import { AssetType } from 'api/types';
import { RecordTypes } from 'api/record/types';
import { ScheduledRecordResponseType, FrequencyTypes } from 'api/period/types';
import { useSettingStore } from 'core/stateHooks';
import { formatAsset } from 'core/utils';

import monthdays from 'static/monthdays.json';
import weekdays from 'static/weekdays.json';

type ListItemProps = {
  item: ScheduledRecordResponseType;
  flatAssets: AssetType[];
  onPress: () => void;
};

const textColorMap = {
  expense: 'color-red-700 dark:color-red-200',
  income: 'color-green-700 dark:color-green-200',
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
  //   const setRecord = useRecord((state) => state.setRecord);
  const theme = useSettingStore((state) => state.theme);

  return (
    <Pressable
      className={`flex-row justify-between items-center p-4 mt-4 rounded-lg ${
        item.type === RecordTypes.EXPENSE ? 'bg-red-100' : 'bg-green-100'
      }`}
      onPress={onPress}
    >
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
          {item.note !== '' && (
            <Text className='dark:color-white'>{item.note}</Text>
          )}

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
    </Pressable>
  );
}
