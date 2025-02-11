import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useBookStore } from 'core/stateHooks';
import { Entypo } from '@expo/vector-icons';
import Icon from '../Icon/Icon';

export default function HomeHeader() {
  const navigation = useNavigation();
  const currentBook = useBookStore((state) => state.currentBook);
  return (
    <View className='flex-row items-center justify-between h-12 px-1 pb-1 -mt-1 bg-primary'>
      <Pressable
        className='flex-row items-center justify-center ml-2'
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Text className='text-lg font-bold color-white'>
          {currentBook.name}
        </Text>
        <Icon name='arrow-right' size={24} color='white' />
      </Pressable>
      <View className='flex-row items-center justify-center gap-4'>
        <Link href='/statistics/trending/' className='pl-3'>
          <Icon name='chart-line' size={24} color='white' />
        </Link>
        <Link href='/records' className='pr-3'>
          <Entypo name='text-document' size={24} color='white' />
        </Link>
      </View>
    </View>
  );
}
