import { View, FlatList, TouchableOpacity } from 'react-native';
import { useRecord } from 'core/stateHooks';
import Key from './Key';
import { RecordTypes } from 'api/record/types';

type KeypadProps = {
  onKeyInput: (item: string) => void;
};

export default function Keypad({ onKeyInput }: KeypadProps) {
  const record = useRecord((state) => state.record);
  return (
    <FlatList
      data={dialPadContent}
      numColumns={4} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        const isTax = item === 'tax' && record.is_marked_tax_return;
        const isDisabled =
          record.type === RecordTypes.TRANSFER &&
          (item === 'tax' || item === 'camera');
        return (
          <TouchableOpacity
            onPress={() => onKeyInput(item)}
            disabled={isDisabled}
          >
            <View
              className={`items-center justify-center w-24 h-16 m-1 ${
                isTax ? 'bg-amber-200' : 'bg-gray-100'
              }  rounded-lg`}
            >
              <Key value={item} disabled={isDisabled} />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const dialPadContent = [
  '1',
  '2',
  '3',
  'camera',
  '4',
  '5',
  '6',
  'delete',
  '7',
  '8',
  '9',
  'clear',
  'tax',
  '0',
  '.',
  'save',
];
