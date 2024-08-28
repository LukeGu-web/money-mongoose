import { View, FlatList, Pressable } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { useRecord } from 'core/stateHooks';
import Key from './Key';
import { RecordTypes } from 'api/record/types';

type KeypadProps = {
  onKeyInput: (item: string) => void;
};

export default function Keypad({ onKeyInput }: KeypadProps) {
  const record = useRecord((state) => state.record);
  const { getValues } = useFormContext();
  return (
    <FlatList
      data={dialPadContent}
      numColumns={4} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        const isTax = item === 'tax' && getValues('is_marked_tax_return');
        const isDisabled =
          record.type === RecordTypes.TRANSFER &&
          (item === 'tax' || item === 'camera');
        return (
          <Pressable onPress={() => onKeyInput(item)} disabled={isDisabled}>
            <View
              className={`items-center justify-center w-24 h-16 m-1 ${
                isTax ? 'bg-amber-200' : 'bg-gray-100'
              }  rounded-lg`}
            >
              <Key value={item} disabled={isDisabled} />
            </View>
          </Pressable>
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
