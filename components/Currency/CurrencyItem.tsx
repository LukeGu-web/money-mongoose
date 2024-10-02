import { useRef } from 'react';
import { Animated, Text, View, Pressable, PanResponder } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { CountryType } from '../Dropdown/types';
import { useCurrencyStore } from 'core/stateHooks';
import { currencySymbol } from 'core/utils';

type CurrencyItemProps = {
  country: CountryType;
  amount: number;
};

export default function CurrencyItem({ country, amount }: CurrencyItemProps) {
  const removeCountry = useCurrencyStore((state) => state.removeCountry);
  const translateX = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          Animated.spring(translateX, {
            toValue: -80,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleDelete = () => {
    translateX.setValue(0);
    removeCountry(country);
  };
  return (
    <View
      testID={`dropdown-item-${country.country}`}
      key={country.country}
      className='flex-row items-center justify-between border-b-2 border-gray-200'
    >
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: translateX }],
        }}
      >
        <View
          className='flex-row items-center justify-between py-2'
          {...panResponder.panHandlers}
        >
          <CountryFlag isoCode={country.iso2} size={24} />
          <Text className='flex-1 px-3 font-medium color-zinc-700 dark:color-zinc-200'>
            {country.country}
          </Text>
          <Text className='flex-1 px-3 font-medium color-blue-500 dark:color-blue-300'>
            {country.currency_code}
          </Text>
          <Text className='flex-1 px-3 font-medium text-right color-zinc-700 dark:color-zinc-200'>
            {currencySymbol(country)} {amount}
          </Text>
        </View>
        <Pressable
          className='absolute items-center justify-center w-20 h-full p-2 bg-red-500 -right-24'
          onPress={handleDelete}
        >
          <Text className='font-semibold text-center color-white'>Delete</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
