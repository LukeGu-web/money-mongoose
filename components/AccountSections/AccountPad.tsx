import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AccountPad() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className='flex-row items-center justify-between'>
      <Pressable className='gap-2' onPress={() => toggleColorScheme()}>
        <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary'>
          {colorScheme === 'light' ? (
            <Ionicons name='moon' size={28} color='#03045e' />
          ) : (
            <Ionicons name='sunny' size={30} color='#03045e' />
          )}
        </View>
        <Text className='text-sm font-semibold text-center text color-primary'>
          {colorScheme === 'light' ? 'Dark' : 'Light'} Mode
        </Text>
      </Pressable>
      <Pressable
        className='gap-2'
        onPress={() => router.navigate('/book/management')}
      >
        <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary'>
          <FontAwesome5 name='book' size={26} color='#03045e' />
        </View>
        <Text className='text-sm font-semibold text-center color-primary'>
          Books
        </Text>
      </Pressable>
      <Pressable
        className='gap-2'
        onPress={() => router.navigate('/tools/tax-calculator')}
      >
        <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary'>
          <MaterialIcons name='account-balance' size={28} color='#03045e' />
        </View>
        <Text className='text-sm font-semibold text-center color-primary'>
          Tax Cal
        </Text>
      </Pressable>
      <Pressable className='gap-2' onPress={() => router.navigate('/records')}>
        <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary'>
          <FontAwesome6 name='money-bill-transfer' size={24} color='#03045e' />
        </View>
        <Text className='text-sm font-semibold text-center color-primary'>
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
