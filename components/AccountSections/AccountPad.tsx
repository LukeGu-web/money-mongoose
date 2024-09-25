import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function AccountPad() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? '#60a5fa' : '#03045e';
  return (
    <View className='flex-row items-center justify-between'>
      <Pressable
        className='gap-2'
        onPress={() => {
          toggleColorScheme();
          router.replace('account/');
        }}
      >
        <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary dark:border-primarydark'>
          {colorScheme === 'light' ? (
            <Ionicons name='moon' size={28} color={color} />
          ) : (
            <Ionicons name='sunny' size={30} color={color} />
          )}
        </View>
        <Text className='text-sm font-semibold text-center text color-primary dark:color-primarydark'>
          {colorScheme === 'light' ? 'Dark' : 'Light'} Mode
        </Text>
      </Pressable>
      <Pressable
        className='gap-2'
        onPress={() => router.navigate('/book/management')}
      >
        <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary dark:border-primarydark'>
          <FontAwesome5 name='book' size={26} color={color} />
        </View>
        <Text className='text-sm font-semibold text-center color-primary dark:color-primarydark'>
          Books
        </Text>
      </Pressable>
      <Pressable
        className='gap-2'
        onPress={() => router.navigate('/tools/tax-calculator')}
      >
        <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary dark:border-primarydark'>
          <FontAwesome6 name='calculator' size={28} color={color} />
        </View>
        <Text className='mt-1 -ml-1 text-xs font-semibold text-center color-primary dark:color-primarydark'>
          Tax Calculator
        </Text>
      </Pressable>
      <Pressable className='gap-2' onPress={() => router.navigate('/records')}>
        <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary dark:border-primarydark'>
          <FontAwesome6 name='money-bill-transfer' size={24} color={color} />
        </View>
        <Text className='text-sm font-semibold text-center color-primary dark:color-primarydark'>
          Records
        </Text>
      </Pressable>
    </View>
  );
}

const padKeys = {
  'dark mode': '/',
  books: '/book/management',
  accounts: '/asset/management',
  records: '/records',
};
