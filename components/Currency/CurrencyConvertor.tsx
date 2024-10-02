import { useState } from 'react';
import { View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useCurrency } from 'api/extra';
import { useCurrencyStore, useSettingStore } from 'core/stateHooks';
import { CountryType } from '../Dropdown/types';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';
import ExchangeList from './ExchangeList';

export default function CurrencyConvertor() {
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const [base, setBase] = useState<CountryType>(baseCurrency);
  const [amount, setAmount] = useState(1);
  const { data: currencies } = useCurrency({
    variables: { currency_code: base.currency_code },
  });

  const theme = useSettingStore((state) => state.theme);
  const handleChange = (country: CountryType, amount: number) => {
    setBase(country);
    setAmount(amount);
  };
  return (
    <View className='items-start justify-start flex-1 w-full gap-2 mt-2'>
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
