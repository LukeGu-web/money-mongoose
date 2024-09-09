import { View, Image, Text } from 'react-native';
import { router } from 'expo-router';
import {
  DrawerContentScrollView,
  DrawerItem,
  // DrawerItemList,
} from '@react-navigation/drawer';
import { useBookStore, useUserStore } from 'core/stateHooks';

const avatarImage = require('../../assets/icon.png');

export default function DrawerContent(props: any) {
  const user = useUserStore((state) => state.user);
  const currentBook = useBookStore((state) => state.currentBook);
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1, backgroundColor: '#6cd4ff' }}
    >
      <View className='items-center gap-4 my-8'>
        <Image
          source={user?.avatar ? { uri: user.avatar } : avatarImage}
          className='w-32 h-32 rounded-lg'
        />
        <Text className='text-lg font-bold color-white'>{user.nickname}</Text>
      </View>
      <View className='flex-1 py-8 bg-white'>
        <View className='mb-2 border-b-2'>
          <Text className='p-2'>Current book:</Text>
          <DrawerItem
            label={currentBook.name ?? 'No book'}
            onPress={() => router.navigate('/book/management')}
          />
        </View>
        <DrawerItem
          label='Book Management'
          onPress={() => router.navigate('/book/management')}
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
