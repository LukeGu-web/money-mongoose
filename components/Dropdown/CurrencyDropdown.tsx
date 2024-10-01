import {
  Text,
  TextInput,
  Pressable,
  View,
  Animated,
  FlatList,
} from 'react-native';
import { useRef, useState } from 'react';
import CountryFlag from 'react-native-country-flag';
import { MaterialIcons } from '@expo/vector-icons';
import CurrencyItem from './CurrencyItem';
import { CountryType } from './types';
import { useSettingStore } from 'core/stateHooks';
import countryData from 'static/country-by-currency-code.json';

type CurrencyDropdownProps = {
  amount?: number;
  base: CountryType;
  countryOnly?: boolean;
  onChange: (country: CountryType, amount: number) => void;
};

export default function CurrencyDropdown({
  amount: baseAmount,
  base,
  countryOnly = false,
  onChange,
}: CurrencyDropdownProps) {
  const theme = useSettingStore((state) => state.theme);
  const iconColor = theme === 'dark' ? '#e5e7eb' : '#9ca3af';
  const [country, setCountry] = useState<CountryType>(base);
  const [value, setValue] = useState<string>('');
  const [amount, setAmount] = useState<string>(String(baseAmount));
  const [filteredData, setFilteredData] = useState(countryData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const resetCountry = () => {
    setFilteredData(countryData);
    setCountry({
      country: 'Australia',
      currency_code: 'AUD',
      iso2: 'AU',
    });
    setValue('');
  };

  const onSelect = (item: CountryType) => {
    setCountry(item);
    onChange(item, Number(amount));
    onDropdownToggle(false);
  };

  const onDropdownToggle = (open: boolean) => {
    if (open) {
      setIsDropdownOpen(open);
      Animated.timing(dropdownHeight, {
        toValue: 200,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(dropdownHeight, {
        toValue: 10,
        duration: 600,
        useNativeDriver: false,
      }).start(() => setIsDropdownOpen(open));
    }
  };

  const onSearching = (text: string) => {
    setValue(text);
    const filtered = countryData.filter(
      (item) =>
        item.country.toLowerCase().includes(text.toLowerCase()) ||
        item.currency_code.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <View className='w-full'>
      {isDropdownOpen ? (
        <View className='flex-row gap-2 p-2 border-2 border-blue-400 rounded-lg min-h-8'>
          <MaterialIcons name='search' size={24} color={iconColor} />
          <TextInput
            autoFocus
            className='flex-grow '
            placeholder='select a country'
            placeholderTextColor='#a1a1aa'
            value={value}
            onChangeText={onSearching}
          />
          <MaterialIcons
            name='close'
            size={24}
            color={iconColor}
            onPress={resetCountry}
          />
          <MaterialIcons
            name='keyboard-arrow-up'
            size={24}
            color={iconColor}
            onPress={() => onDropdownToggle(false)}
          />
        </View>
      ) : (
        <View>
          {countryOnly ? (
            <Pressable
              className='flex-row items-center gap-2 p-2 border-2 border-blue-400 rounded-lg min-h-8'
              onPress={() => onDropdownToggle(true)}
            >
              <CountryFlag isoCode={country.iso2} size={24} />
              <Text className={`flex-grow font-medium`}>
                {country.currency_code}
              </Text>
              <MaterialIcons
                name='keyboard-arrow-down'
                size={24}
                color={iconColor}
              />
            </Pressable>
          ) : (
            <View className='flex-row gap-2 p-1 border-2 border-gray-400 rounded-lg'>
              <Pressable
                className='flex-row items-center gap-2 p-2 border-2 border-blue-400 rounded-lg min-h-8'
                onPress={() => onDropdownToggle(true)}
              >
                <CountryFlag isoCode={country.iso2} size={24} />
                <Text className={`flex-grow font-medium dark:color-white`}>
                  {country.currency_code}
                </Text>
                <MaterialIcons
                  name='keyboard-arrow-down'
                  size={24}
                  color={iconColor}
                />
              </Pressable>
              <TextInput
                className='flex-1 px-2 text-right dark:color-white'
                clearButtonMode='while-editing'
                placeholder='enter amount'
                placeholderTextColor='#a1a1aa'
                keyboardType='numeric'
                value={amount}
                onChangeText={setAmount}
                onBlur={() => onChange(country, Number(amount))}
              />
            </View>
          )}
        </View>
      )}
      {isDropdownOpen ? (
        <Animated.View
          className='mt-1 border-2 border-blue-400 rounded-lg'
          style={{ maxHeight: dropdownHeight }}
        >
          {filteredData.length === 0 ? (
            <View className='w-full p-4'>
              <Text className='text-center color-gray-800'>
                No results found
              </Text>
            </View>
          ) : (
            <FlatList
              className='w-full p-2'
              nestedScrollEnabled={true}
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <CurrencyItem key={index} item={item} onSelect={onSelect} />
              )}
            />
          )}
        </Animated.View>
      ) : null}
    </View>
  );
}
