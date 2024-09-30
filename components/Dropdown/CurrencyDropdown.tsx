import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  FlatList,
  Keyboard,
} from 'react-native';
import { useRef, useState } from 'react';
import CountryFlag from 'react-native-country-flag';
import { MaterialIcons } from '@expo/vector-icons';
import CurrencyItem from './CurrencyItem';
import { countryType } from './types';
import countryData from 'static/country-by-currency-code.json';

export default function CurrencyDropdown() {
  const [country, setCountry] = useState<countryType>({
    country: 'Australia',
    currency_code: 'AUD',
    iso2: 'AU',
  });
  const [value, setValue] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [filteredData, setFilteredData] = useState(countryData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const resetData = () => {
    setFilteredData(countryData);
    setCountry({
      country: 'Australia',
      currency_code: 'AUD',
      iso2: 'AU',
    });
    setValue('');
  };

  const onSelect = (item: countryType) => {
    setCountry(item);
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
    <>
      {isDropdownOpen ? (
        <View className='flex-row gap-2 p-2 border-2 border-blue-400 rounded-lg min-h-8'>
          <MaterialIcons name='search' size={24} color='#9ca3af' />
          <TextInput
            autoFocus
            className='flex-grow '
            placeholder='select a country'
            value={value}
            onChangeText={onSearching}
          />
          <MaterialIcons
            name='close'
            size={24}
            color='#9ca3af'
            onPress={resetData}
          />
          <MaterialIcons
            name='keyboard-arrow-up'
            size={24}
            color='#9ca3af'
            onPress={() => onDropdownToggle(false)}
          />
        </View>
      ) : (
        <View className='flex-row gap-2 p-1 border-2 border-gray-400 rounded-lg'>
          <TouchableOpacity
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
              color='#9ca3af'
            />
          </TouchableOpacity>
          <TextInput
            className='flex-1 px-2 text-right'
            clearButtonMode='while-editing'
            placeholder='enter amount'
            keyboardType='numeric'
            value={amount}
            onChangeText={setAmount}
            onBlur={() => console.log('onnnnnn')}
          />
        </View>
      )}
      {isDropdownOpen ? (
        <Animated.View
          className='border-2 border-blue-400 rounded-lg '
          style={{ maxHeight: dropdownHeight }}
        >
          {filteredData.length === 0 ? (
            <View className='min-w-full p-4'>
              <Text className='text-center color-gray-800'>
                No results found
              </Text>
            </View>
          ) : (
            <FlatList
              className='min-w-full p-2'
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
    </>
  );
}
