import { View, Text, TouchableOpacity } from 'react-native';
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

export default function ListItem({ item, onPress }: ListItemProps) {
  const setRecord = useRecord((state) => state.setRecord);
  const { getCurrentBook } = useBookStore();
  const book = getCurrentBook() as BookType;
  let borderColor = '',
    textColor = '';
  if (!('type' in item)) {
    borderColor = 'border-blue-700';
    textColor = 'color-blue-700';
  } else {
    borderColor =
      item.type === RecordTypes.EXPENSE ? 'border-red-700' : 'border-green-700';
    textColor =
      item.type === RecordTypes.EXPENSE ? 'color-red-700' : 'color-green-700';
  }

  return (
    <TouchableOpacity
      className={`flex-row justify-between items-center border-b-2 p-2 border-blue-700 ${borderColor}`}
      onPress={() => {
        if (!('type' in item)) {
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
      {!('type' in item) ? (
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

      <Text className={`font-bold  ${textColor}`}>
        {Number(item.amount).toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}
