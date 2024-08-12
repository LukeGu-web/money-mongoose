import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookList from 'components/Book/BookList';
import { useBookStore } from 'core/stateHooks';

export default function BookManagement() {
  const selectBook = useBookStore((state) => state.selectBook);
  const handleCreate = () => {
    selectBook(null);
    router.navigate('/book/details');
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
