import { View, Text, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function AccountPad() {
  return (
    <FlatList
      data={Object.keys(padKeys)}
      numColumns={5} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      columnWrapperStyle={{ gap: 8, marginVertical: 8 }}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() =>
              router.navigate(padKeys[item as keyof typeof padKeys])
            }
          >
            <View className='items-center justify-center w-20 h-20 bg-gray-100 rounded-lg'>
              <Text className='text-lg font-semibold color-indigo-900'>
                {item}
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const padKeys = {
  'dark mode': '/',
  books: '/book/management',
  accounts: '/asset/management',
  records: '/records',
  'test mode': '/',
  book: '/book/management',
  account: '/asset/management',
  record: '/records',
};
