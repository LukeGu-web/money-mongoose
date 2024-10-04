import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookList from 'components/Book/BookList';
import { useBook, useSettingStore } from 'core/stateHooks';

export default function BookManagement() {
  const resetBook = useBook((state) => state.resetBook);
  const theme = useSettingStore((state) => state.theme);
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
        backgroundColor: theme === 'dark' ? 'black' : 'white',
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
