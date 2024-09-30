import { Text, Pressable } from 'react-native';
import { DropdownItemProps } from './types';

export default function DropdownItem({ item, select }: DropdownItemProps) {
  return (
    <Pressable
      testID={`dropdown-item-${item.key}`}
      key={item.key}
      className='flex-row items-center justify-between py-2 border-b-2 border-gray-200'
      onPress={() => select(item)}
    >
      <Text className='flex-1 px-3 font-medium color-zinc-700'>
        {item.value}
      </Text>
    </Pressable>
  );
}
