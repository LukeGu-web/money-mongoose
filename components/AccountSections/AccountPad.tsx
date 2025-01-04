import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useShallow } from 'zustand/react/shallow';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSettingStore } from 'core/stateHooks';

export default function AccountPad() {
  const { theme, setTheme } = useSettingStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
    }))
  );
  const { setColorScheme } = useColorScheme();
  const color = theme === 'dark' ? '#3b82f6' : '#03045e';
  return (
    <View className='gap-2 mb-4'>
      <Text className='color-zinc-600 dark:color-zinc-300'>Tools</Text>
      <View className='flex-row items-center justify-between'>
        <Link
          href='account'
          replace // refreash account page to implement new theme
          onPress={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            setColorScheme(newTheme);
            setTheme(newTheme);
          }}
        >
          <View className='gap-2'>
            <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary dark:border-primarydark'>
              {theme === 'light' ? (
                <Ionicons name='moon' size={28} color={color} />
              ) : (
                <Ionicons name='sunny' size={30} color={color} />
              )}
            </View>
            <Text className='text-sm font-semibold text-center text color-primary dark:color-primarydark'>
              {theme === 'light' ? 'Dark' : 'Light'} Mode
            </Text>
          </View>
        </Link>
        <Link href='/records/period-list'>
          <View className='gap-2'>
            <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary dark:border-primarydark'>
              <MaterialCommunityIcons
                name='calendar-range'
                size={32}
                color={color}
              />
            </View>
            <Text className='text-sm font-semibold text-center color-primary dark:color-primarydark'>
              Periods
            </Text>
          </View>
        </Link>
        <Link href='/tools/tax-calculator'>
          <View className='gap-2'>
            <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary dark:border-primarydark'>
              <FontAwesome6 name='calculator' size={28} color={color} />
            </View>
            <Text className='mt-1 -ml-1 text-xs font-semibold text-center color-primary dark:color-primarydark'>
              Tax Calculator
            </Text>
          </View>
        </Link>
        <Link href='/tools/currency'>
          <View className='gap-2'>
            <View className='items-center justify-center w-20 h-20 border-2 rounded-lg border-primary dark:border-primarydark'>
              <FontAwesome6
                name='money-bill-transfer'
                size={24}
                color={color}
              />
            </View>
            <Text className='text-sm font-semibold text-center color-primary dark:color-primarydark'>
              Currency
            </Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const padKeys = {
  'dark mode': '/',
  books: '/book/management',
  accounts: '/asset/management',
  records: '/records',
};
