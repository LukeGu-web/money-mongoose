import { useState } from 'react';
import { Text, Pressable, FlatList, ScrollView } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CurrencyItem from './CurrencyItem';
import CurrencyModal from '../Modal/CurrencyModal';
import { useCurrencyStore } from 'core/stateHooks';

type ExchangeListProps = {
  amount: number;
  rates: {
    [key: string]: number;
  }[];
};

export default function ExchangeList({ amount, rates }: ExchangeListProps) {
  const { list, addCountry } = useCurrencyStore(
    useShallow((state) => ({
      list: state.list,
      addCountry: state.addCountry,
    }))
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <ScrollView className='w-full gap-2 p-2 border-2 border-gray-400 rounded-lg'>
      {list.length > 0 ? (
        <FlatList
          className='w-full p-2'
          // nestedScrollEnabled={true}
          horizontal={false}
          scrollEnabled={false}
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <CurrencyItem
              key={index}
              country={item}
              // @ts-ignore: ignore type
              amount={(amount * rates[item.currency_code]).toFixed(4)}
            />
          )}
        />
      ) : (
        <Text className='p-2 text-center'>No Currency</Text>
      )}
      <Pressable
        className='flex-row items-center justify-center gap-4 p-3 mb-8 rounded-lg bg-amber-300'
        onPress={() => setIsVisible(true)}
      >
        <MaterialIcons name='add' size={20} color='black' />
        <Text>Add New Currency</Text>
      </Pressable>
      <CurrencyModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onSelectCountry={addCountry}
      />
    </ScrollView>
  );
}
