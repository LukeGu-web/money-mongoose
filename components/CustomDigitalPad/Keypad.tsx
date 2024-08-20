import { View, FlatList, TouchableOpacity } from 'react-native';
import { useRecord } from 'core/stateHooks';
import Key from './Key';

type KeypadProps = {
  onKeyInput: (item: string) => void;
};

export default function Keypad({ onKeyInput }: KeypadProps) {
  const record = useRecord((state) => state.record);
  console.log('Key record: ', record.is_marked_tax_return);
  return (
    <FlatList
      data={dialPadContent}
      numColumns={4} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        const isTax = item === 'tax' && record.is_marked_tax_return;
        return (
          <TouchableOpacity onPress={() => onKeyInput(item)}>
            <View
              className={`items-center justify-center w-24 h-16 m-1 ${
                isTax ? 'bg-amber-200' : 'bg-gray-100'
              }  rounded-lg`}
            >
              <Key value={item} />
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
