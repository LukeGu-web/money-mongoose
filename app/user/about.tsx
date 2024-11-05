import { View, Text, Image, Pressable } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSettingStore } from 'core/stateHooks';
const avatarImage = require('../../assets/icon.png');

export default function About() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <View className='flex-1 w-full gap-8 p-4 bg-white dark:bg-black'>
      <View className='items-center justify-center gap-4'>
        <Image className='w-32 h-32' source={avatarImage} />
        <Text className='text-2xl font-semibold color-primary dark:color-blue-100'>
          Version: 1.0.1
        </Text>
      </View>
      <View className='w-full rounded-lg bg-zinc-200 dark:bg-zinc-800'>
        <Pressable
          className='flex-row items-center gap-2 px-4 py-2'
          onPress={() =>
            openBrowserAsync('https://getrich.lukegu.com/privacy-policy/')
          }
        >
          <MaterialIcons
            name='privacy-tip'
            size={20}
            color={theme === 'dark' ? 'white' : 'black'}
          />
          <Text className='text-lg dark:color-white'>Privacy Policy</Text>
        </Pressable>
      </View>
    </View>
  );
}
