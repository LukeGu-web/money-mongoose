import { View, FlatList, Pressable } from 'react-native';
import { useFormContext } from 'react-hook-form';
import Key from './Key';
import { RecordTypes } from 'api/record/types';

type KeypadProps = {
  onKeyInput: (item: string) => void;
};

export default function Keypad({ onKeyInput }: KeypadProps) {
  const { getValues } = useFormContext();
  return (
    <FlatList
      data={dialPadContent}
      numColumns={4} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        const isTax = item === 'tax' && getValues('is_marked_tax_return');
        const isDisabled =
          getValues('type') !== RecordTypes.EXPENSE && item === 'tax';
        return (
          <Pressable onPress={() => onKeyInput(item)} disabled={isDisabled}>
            <View
              className={`items-center justify-center w-24 h-16 m-1 ${
                isTax
                  ? 'bg-amber-200 dark:bg-amber-400'
                  : 'bg-gray-100 dark:bg-gray-800'
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
