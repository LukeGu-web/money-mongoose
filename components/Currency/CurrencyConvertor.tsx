import { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useSettingStore } from 'core/stateHooks';
import { CountryType } from '../Dropdown/types';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';
import ExchangeList from './ExchangeList';

const getCurrencies = async (base: string) => {
  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/5872f89cab9e8d980b25bf0a/latest/${base}`
  );
  return response.data;
};

export default function CurrencyConvertor() {
  const [base, setBase] = useState<CountryType>({
    country: 'Australia',
    currency_code: 'AUD',
    iso2: 'AU',
  });
  const [amount, setAmount] = useState(1);
  const {
    data: currencies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['currencies', base],
    queryFn: () => getCurrencies(base.currency_code),
  });
  const theme = useSettingStore((state) => state.theme);
  const handleChange = (country: CountryType, amount: number) => {
    setBase(country);
    setAmount(amount);
  };
  return (
    <View className='items-start justify-start flex-1 w-full gap-2'>
      <CurrencyDropdown amount={amount} base={base} onChange={handleChange} />
      <View className='self-center py-2'>
        <MaterialIcons name='currency-exchange' size={32} color='#facc15' />
      </View>
      {currencies && (
        <ExchangeList amount={amount} rates={currencies.conversion_rates} />
      )}
    </View>
  );
}
