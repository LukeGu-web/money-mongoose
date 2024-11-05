import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSettingStore } from 'core/stateHooks';

export default function InformationSection() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <View className='items-start justify-center flex-1 gap-2 mb-4'>
      <Text className='color-zinc-600 dark:color-zinc-300'>Infomation</Text>
      <View className='w-full rounded-lg bg-zinc-200 dark:bg-zinc-800'>
        <Pressable
          className='flex-row items-center gap-2 px-4 py-2 border-b-2 border-white dark:border-black'
          onPress={() => router.navigate('/user/contact-us/')}
        >
          <AntDesign
            name='customerservice'
            size={20}
            color={theme === 'dark' ? 'white' : 'black'}
          />
          <Text className='text-lg dark:color-white'>Contact Us</Text>
        </Pressable>
        <Pressable
          className='flex-row items-center gap-2 px-4 py-2'
          onPress={() => router.navigate('/user/about/')}
        >
          <AntDesign
            name='infocirlceo'
            size={20}
            color={theme === 'dark' ? 'white' : 'black'}
          />
          <Text className='text-lg dark:color-white'>About</Text>
        </Pressable>
      </View>
    </View>
  );
}
