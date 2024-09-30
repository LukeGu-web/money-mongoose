import { useState } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
  // const [base, setBase] = useState('AUD');
  // const {
  //   data: currencies,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ['currencies', base],
  //   queryFn: () => getCurrencies(base),
  // });
  // console.log(currencies);
  const theme = useSettingStore((state) => state.theme);
  const handleChange = (country: CountryType, amount: number) => {
    console.log('handleChange: ', country, amount);
  };
  return (
    <View className='items-start justify-start flex-1 w-full gap-2'>
      <CurrencyDropdown onChange={handleChange} />
      <ExchangeList />
    </View>
  );
}
