import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookList from 'components/Book/BookList';

export default function BookManagement() {
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
      <ScrollView>
        <BookList />
      </ScrollView>
      <TouchableOpacity
        className='items-center w-4/5 p-3 bg-yellow-300 rounded-md'
        onPress={() => router.navigate('/asset/add-bank-account')}
      >
        <Text className='font-semibold'>Create New Book</Text>
      </TouchableOpacity>

      <StatusBar style='light' />
    </SafeAreaView>
  );
}
