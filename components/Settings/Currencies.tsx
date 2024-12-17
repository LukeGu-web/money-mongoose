import { View, Text } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { useCurrencyStore } from 'core/stateHooks';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';
import { CountryType } from '../Dropdown/types';

export default function Currencies() {
  const { baseCurrency, setBaseCurrency } = useCurrencyStore(
    useShallow((state) => ({
      baseCurrency: state.baseCurrency,
      setBaseCurrency: state.setBaseCurrency,
    }))
  );
  const handleChange = (country: CountryType, amount: number) => {
    setBaseCurrency(country);
  };
  return (
    <View className='gap-2'>
      <Text className='color-zinc-600 dark:color-zinc-300'>
        Currency Exchange
      </Text>
      <View className='w-full gap-4 px-2 py-4 rounded-lg bg-zinc-200 dark:bg-zinc-800'>
        <View className='gap-1'>
          <Text className='color-zinc-600 dark:color-zinc-300'>
            Base Currency
          </Text>
          <CurrencyDropdown
            base={baseCurrency}
            countryOnly
            onChange={handleChange}
          />
        </View>
      </View>
    </View>
  );
}
