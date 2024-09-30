import { Text, Pressable } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { CountryType } from '../Dropdown/types';

type CurrencyItemProps = {
  country: CountryType;
  amount: number;
};

export default function CurrencyItem({ country, amount }: CurrencyItemProps) {
  return (
    <Pressable
      testID={`dropdown-item-${country.country}`}
      key={country.country}
      className='flex-row items-center justify-between py-2 border-b-2 border-gray-200'
    >
      <CountryFlag isoCode={country.iso2} size={24} />
      <Text className='flex-1 px-3 font-medium color-zinc-700'>
        {country.country}
      </Text>
      <Text className='flex-1 px-3 font-medium color-blue-500'>
        {country.currency_code}
      </Text>
      <Text className='flex-1 px-3 font-medium color-zinc-700'>{amount}</Text>
    </Pressable>
  );
}
