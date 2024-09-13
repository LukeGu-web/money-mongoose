import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useBookStore } from 'core/stateHooks';
import { Entypo } from '@expo/vector-icons';
import Icon from '../Icon/Icon';

export default function HomeHeader() {
  const currentBook = useBookStore((state) => state.currentBook);
  return (
    <View className='flex-row items-center justify-between h-12 px-1 pb-1 -mt-1 bg-primary'>
      <View className='flex-row items-center justify-center gap-2'>
        <DrawerToggleButton tintColor='#fff' />
        <Text className='text-lg font-bold color-white'>
          {currentBook.name}
        </Text>
      </View>
      <View className='flex-row items-center justify-center gap-4'>
        <Link href='/chart/line/' className='pl-3'>
          <Icon name='chart-line' size={24} color='#fff' />
        </Link>
        <Link href='/records' className='pr-3'>
          <Entypo name='text-document' size={24} color='#fff' />
        </Link>
      </View>
    </View>
  );
}
