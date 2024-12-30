import { View, Text, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import allCategories from 'static/categories.json';
import Icon from '../Icon/CIcon';

import { AssetType } from 'api/types';
import {
  RecordTypes,
  RecordAPI as Record,
  TransferAPI as Transfer,
} from 'api/record/types';
import { useRecord, useSettingStore } from 'core/stateHooks';
import { formatAsset } from 'core/utils';

type ListItemProps = {
  item: Record | Transfer;
  flatAssets: AssetType[];
  onPress: () => void;
};

const borderColorMap = {
  expense: 'border-red-700',
  income: 'border-green-700',
  transfer: 'border-blue-700',
};

const textColorMap = {
  expense: 'color-red-700 dark:color-red-200',
  income: 'color-green-700 dark:color-green-200',
  transfer: 'color-blue-700 dark:color-blue-200',
};

export default function ListItem({ item, flatAssets, onPress }: ListItemProps) {
  const setRecord = useRecord((state) => state.setRecord);
  const theme = useSettingStore((state) => state.theme);
  return (
    <Pressable
      className={`flex-row justify-between items-center border-b-2 p-2 ${
        borderColorMap[item.type]
      }`}
      onPress={() => {
        if (item.type === RecordTypes.TRANSFER) {
          setRecord({
            ...item,
            date: new Date(item.date),
            from_asset: formatAsset(Number(item.from_asset), flatAssets, false),
            to_asset: formatAsset(Number(item.to_asset), flatAssets, false),
          });
        } else {
          setRecord({
            ...item,
            date: new Date(item.date),
            asset: formatAsset(Number(item.asset), flatAssets, false),
          });
        }
        onPress();
      }}
    >
      {item.type === RecordTypes.TRANSFER ? (
        <View className='flex-row flex-1'>
          <View className='items-start justify-center w-1/6'>
            <FontAwesome
              name='exchange'
              size={24}
              color={theme === 'dark' ? 'white' : 'black'}
            />
          </View>
          <Text className='pb-1 text-lg font-bold dark:color-white'>{`from ${formatAsset(
            Number(item.from_asset),
            flatAssets,
            true
          )} to ${formatAsset(Number(item.to_asset), flatAssets, true)}`}</Text>
        </View>
      ) : (
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
          </View>
        </View>
      )}
      <View>
        <Text
          className={`font-bold ${textColorMap[item.type]} dark:color-white`}
        >
          {Number(item.amount).toFixed(2)}
        </Text>
        {item.type !== RecordTypes.TRANSFER && (
          <Text className='text-sm text-right dark:color-white'>
            {formatAsset(Number(item.asset), flatAssets, true)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
