import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useSettingStore } from 'core/stateHooks';
import Icon from '../Icon/Icon';

export default function SettingsSection() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <View className='items-start justify-center flex-1 gap-2 mb-4'>
      <Text className='color-zinc-600 dark:color-zinc-300'>Settings</Text>
      <View className='w-full rounded-lg bg-zinc-200 dark:bg-zinc-800'>
        <Pressable
          className='flex-row items-center gap-2 px-4 py-2 border-white dark:border-black'
          onPress={() => router.navigate('/user/settings')}
        >
          <Icon
            name='setting'
            size={22}
            color={theme === 'dark' ? 'white' : 'black'}
          />
          <Text className='text-lg dark:color-white'>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}
