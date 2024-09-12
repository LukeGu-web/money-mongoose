import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookList from 'components/Book/BookList';
import { useBook } from 'core/stateHooks';

export default function BookManagement() {
  const resetBook = useBook((state) => state.resetBook);
  const handleCreate = () => {
    resetBook();
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
      <Pressable
        className='items-center w-4/5 p-3 bg-yellow-300 rounded-lg'
        onPress={handleCreate}
      >
        <Text className='font-semibold'>Create New Book</Text>
      </Pressable>

      <StatusBar style='light' />
    </SafeAreaView>
  );
}
