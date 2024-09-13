import { View, Text, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { useBookStore } from 'core/stateHooks';
import { Entypo } from '@expo/vector-icons';
import Icon from '../Icon/Icon';
import { useState } from 'react';

const timeframes = ['all', 'year', 'month', 'week'];

export default function CategoryHeader() {
  const currentBook = useBookStore((state) => state.currentBook);
  const [timeframe, setTimeframe] = useState('all');
  return (
    <View className='-mt-1'>
      <View className='flex-row items-center justify-between h-12 px-4 pb-1 bg-primary'>
        <Pressable className='py-2 pr-2' onPress={() => router.back()}>
          <Icon name='left' size={24} color='#fff' />
        </Pressable>
        <View className='flex-row items-center border-2 border-white rounded-lg'>
          {Object.values(timeframes).map((item, index) => (
            <Pressable
              key={item}
              className={`items-center justify-center py-1 w-16 border-white ${
                index < 3 && 'border-r-2'
              } ${timeframe === item && 'bg-white'}`}
              onPress={() => setTimeframe(item)}
            >
              <Text
                className={`text-center font-medium ${
                  timeframe === item ? 'color-primary' : 'color-white'
                }`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <Link href='/chart/line/' className='pl-3'>
          <Icon name='chart-line' size={24} color='#fff' />
        </Link>
      </View>
      <View className='items-center justify-center h-12 bg-white'>
        <Text>{timeframe}</Text>
      </View>
    </View>
  );
}
