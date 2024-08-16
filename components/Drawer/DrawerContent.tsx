import { View, Image, Text } from 'react-native';
import { router } from 'expo-router';
import {
  DrawerContentScrollView,
  DrawerItem,
  // DrawerItemList,
} from '@react-navigation/drawer';
import { useShallow } from 'zustand/react/shallow';
import { useBookStore } from 'core/stateHooks';

const avatarImage = require('../../assets/icon.png');

export default function DrawerContent(props: any) {
  const { getCurrentBook, currentBookId } = useBookStore();
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1, backgroundColor: '#6cd4ff' }}
    >
      <View className='items-center gap-4 my-8'>
        <Image source={avatarImage} className='w-32 h-32' />
        <Text className='text-lg font-bold color-white'>Luke</Text>
      </View>
      <View className='flex-1 py-8 bg-white'>
        <View className='mb-2 border-b-2'>
          <Text className='p-2'>Current book:</Text>
          <DrawerItem
            label={String(currentBookId) ?? 'No book'}
            onPress={() => router.navigate('/book/book-management')}
          />
        </View>
        <DrawerItem
          label='Book Management'
          onPress={() => router.navigate('/book/book-management')}
        />
        <DrawerItem
          label='Create new book'
          onPress={() => router.navigate('/book/details')}
        />
        {/* <DrawerItemList {...props} /> */}
      </View>
    </DrawerContentScrollView>
  );
}
