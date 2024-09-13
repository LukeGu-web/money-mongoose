import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from 'components/Icon/Icon';

import {
  RecordTypes,
  RecordAPI as Record,
  TransferAPI as Transfer,
} from 'api/record/types';
import { useGetFlatAssets } from 'api/asset';
import { useRecord, useBookStore } from 'core/stateHooks';
import { formatAsset } from 'core/utils';

type ListItemProps = {
  item: Record | Transfer;
  onPress: () => void;
};

const borderColorMap = {
  expense: 'border-red-700',
  income: 'border-green-700',
  transfer: 'border-blue-700',
};

const textColorMap = {
  expense: 'color-red-700',
  income: 'color-green-700',
  transfer: 'color-blue-700',
};

export default function ListItem({ item, onPress }: ListItemProps) {
  const setRecord = useRecord((state) => state.setRecord);
  const book = useBookStore((state) => state.currentBook);
  const { data } = useGetFlatAssets({
    variables: { book_id: book.id },
  });

  if (!data) {
    return <ActivityIndicator size='small' />;
  }

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
            from_asset: formatAsset(Number(item.from_asset), data, false),
            to_asset: formatAsset(Number(item.to_asset), data, false),
          });
        } else {
          setRecord({
            ...item,
            date: new Date(item.date),
            asset: formatAsset(Number(item.asset), data, false),
          });
        }
        onPress();
      }}
    >
      {item.type === RecordTypes.TRANSFER ? (
        <View className='flex-row flex-1'>
          <View className='items-start justify-center w-1/6'>
            <FontAwesome name='exchange' size={24} color='black' />
          </View>
          <Text className='pb-1 text-lg font-bold'>{`from ${formatAsset(
            Number(item.from_asset),
            data,
            true
          )} to ${formatAsset(Number(item.to_asset), data, true)}`}</Text>
        </View>
      ) : (
        <View className='flex-row flex-1 gap-2'>
          <View className='items-start justify-center w-1/6'>
            <Icon name={item.category} size={28} color='black' />
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
              <Text className='pb-1 text-lg font-bold'>{item.category}</Text>
              {item.subcategory && (
                <Text className='pb-1 text-lg '> - {item.subcategory}</Text>
              )}
            </View>
            {item.note !== '' && <Text>{item.note}</Text>}
          </View>
        </View>
      )}
      <View>
        <Text className={`font-bold ${textColorMap[item.type]}`}>
          {Number(item.amount).toFixed(2)}
        </Text>
        {item.type !== RecordTypes.TRANSFER && (
          <Text className='text-sm text-right'>
            {formatAsset(Number(item.asset), data, true)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
