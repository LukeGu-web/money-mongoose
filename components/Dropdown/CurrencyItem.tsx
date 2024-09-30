import { Text, Pressable } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { CurrencyItemProps } from './types';

export default function CurrencyItem({ item, onSelect }: CurrencyItemProps) {
  return (
    <Pressable
      testID={`dropdown-item-${item.country}`}
      key={item.country}
      className='flex-row items-center justify-between py-2 border-b-2 border-gray-200'
      onPress={() => onSelect(item)}
    >
      <CountryFlag isoCode={item.iso2} size={24} />
      <Text className='flex-1 px-3 font-medium color-zinc-700'>
        {item.country}
      </Text>
      <Text className='flex-1 px-3 font-medium color-blue-500'>
        {item.currency_code}
      </Text>
    </Pressable>
  );
}
