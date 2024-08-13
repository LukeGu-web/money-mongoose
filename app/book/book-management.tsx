import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/react/shallow';
import BookList from 'components/Book/BookList';

import { client } from 'api/client';
import { formatApiError } from 'api/errorFormat';
import { useBookStore } from 'core/stateHooks';
import { BookType } from 'api/types';

export default function BookManagement() {
  const { selectBook, setBooks, setCurrentBook, currentBook } = useBookStore(
    useShallow((state) => ({
      selectBook: state.selectBook,
      setBooks: state.setBooks,
      setCurrentBook: state.setCurrentBook,
      currentBook: state.currentBook,
    }))
  );

  const handleCreate = () => {
    selectBook(null);
    router.navigate('/book/details');
  };
  const handleSync = () => {
    client
      .get('book/')
      .then((response) => {
        console.log('submit success:', response.data);
        setBooks(response.data);
        const updated = response.data.find(
          (book: BookType) => book.id === (currentBook as BookType).id
        );
        setCurrentBook(updated);
      })
      .catch((error) => {
        console.log('error: ', formatApiError(error));
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
