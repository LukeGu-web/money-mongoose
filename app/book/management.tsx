import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookList from 'components/Book/BookList';

import { client } from 'api/client';
import { BookType } from 'api/types';
import { formatApiError } from 'api/errorFormat';
import { useBookStore, useBook } from 'core/stateHooks';
import log from 'core/logger';

export default function BookManagement() {
  const { setBooks, setCurrentBook, currentBook } = useBookStore();
  const resetBook = useBook((state) => state.resetBook);
  const handleCreate = () => {
    resetBook();
    router.navigate('/book/details');
  };
  const handleSync = () => {
    client
      .get('book/')
      .then((response) => {
        log.success('Get all books success:', response.data);
        setBooks(response.data);
        const updated = response.data.find(
          (book: BookType) => book.id === currentBook.id
        );
        setCurrentBook(updated.id, updated.name);
      })
      .catch((error) => {
        log.error('Error: ', formatApiError(error));
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
      edges={['bottom']}
    >
      <ScrollView className='w-full'>
        <View className='flex-row items-center justify-between p-2 mb-3 bg-gray-200'>
          <Text>Sync your books with database</Text>
          <TouchableOpacity
            className='items-center p-1 bg-gray-500 rounded-md'
            onPress={handleSync}
          >
            <Text className='font-medium color-white'>Sync</Text>
          </TouchableOpacity>
        </View>
        <BookList />
      </ScrollView>
      <TouchableOpacity
        className='items-center w-4/5 p-3 bg-yellow-300 rounded-md'
        onPress={handleCreate}
      >
        <Text className='font-semibold'>Create New Book</Text>
      </TouchableOpacity>

      <StatusBar style='light' />
    </SafeAreaView>
  );
}
