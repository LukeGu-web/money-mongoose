import { useState } from 'react';
import { View, Text } from 'react-native';
import { useSettingStore } from 'core/stateHooks';
import Dropdown from '../Dropdown/Dropdown';
import { DropdownDataType } from '../Dropdown/types';

export default function CurrencyConvertor() {
  const theme = useSettingStore((state) => state.theme);
  const [selected, setSelected] = useState<DropdownDataType<
    string,
    string
  > | null>(null);
  const [data] = useState<DropdownDataType<string, string>[]>([
    { key: '1', value: 'Toothbrush' },
    { key: '2', value: 'Laptop' },
    { key: '3', value: 'Sunglasses' },
    { key: '4', value: 'Baseball' },
    { key: '5', value: 'Scissors' },
    { key: '6', value: 'Bicycle' },
    { key: '7', value: 'Camera' },
    { key: '8', value: 'Umbrella' },
    { key: '9', value: 'Backpack' },
    { key: '10', value: 'Water bottle' },
  ]);
  return (
    <View className='items-start justify-start flex-1 gap-2'>
      <Text>Currency</Text>
      <Dropdown
        data={data}
        placeholder={'Select option'}
        selected={selected}
        setSelected={setSelected}
      />
    </View>
  );
}
