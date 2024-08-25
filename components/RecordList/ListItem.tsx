import { View, Text, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from 'components/Icon/Icon';
import { BookType } from 'api/types';
import {
  RecordTypes,
  RecordAPI as Record,
  TransferAPI as Transfer,
} from 'api/record/types';
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
  const { getCurrentBook } = useBookStore();
  const book = getCurrentBook() as BookType;

  return (
    <Pressable
      className={`flex-row justify-between items-center border-b-2 p-2 ${
        borderColorMap[item.type]
      }`}
      onPress={() => {
        if (item.type === RecordTypes.TRANSFER) {
          setRecord({
            ...item,
            from_asset: formatAsset(Number(item.from_asset), book, false),
            to_asset: formatAsset(Number(item.to_asset), book, false),
          });
        } else {
          setRecord({
            ...item,
            asset: formatAsset(Number(item.asset), book, false),
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
            book,
            true
          )} to ${formatAsset(Number(item.to_asset), book, true)}`}</Text>
        </View>
      ) : (
        <View className='flex-row flex-1'>
          <View className='items-start justify-center w-1/6'>
            <Icon name={item.category} size={28} color='black' />
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
            {formatAsset(Number(item.asset), book, true)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
