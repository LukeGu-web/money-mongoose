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
  const { books, currentBook } = useBookStore(
    useShallow((state) => ({
      books: state.books,
      currentBook: state.currentBook,
    }))
  );

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
        {books.map((book) =>
          book.id === currentBook?.id ? (
            <View key={book.id} className='mb-2 border-b-2'>
              <Text className='p-2'>Current books:</Text>
              <DrawerItem
                key={book.id}
                label={book.name}
                onPress={() => router.navigate('/book/book-management')}
              />
            </View>
          ) : (
            <DrawerItem key={book.id} label={book.name} onPress={() => {}} />
          )
        )}
        <DrawerItem
          label='Create new book'
          onPress={() => router.navigate('/book/add-new')}
        />
        {/* <DrawerItemList {...props} /> */}
      </View>
    </DrawerContentScrollView>
  );
}
