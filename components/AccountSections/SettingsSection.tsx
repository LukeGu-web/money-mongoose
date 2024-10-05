import { View, Text, Pressable, Switch } from 'react-native';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { useSettingStore } from 'core/stateHooks';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from '../Icon/Icon';

export default function SettingsSection() {
  const { isEnabledReminder, setIsEnabledReminder, theme } = useSettingStore();
  const switchColors =
    theme === 'dark'
      ? {
          trackColor: { false: '#334155', true: '#075985' },
          thumbColor: '#27272a',
        }
      : {
          trackColor: { false: '#cbd5e1', true: '#60a5fa' },
          thumbColor: '#f4f4f5',
        };

  if (isEnabledReminder) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Reminder',
        body: 'Any expenses to record today?',
      },
      trigger: {
        day: 1,
        repeats: true,
      },
    });
  }
  return (
    <View className='items-start justify-center flex-1 gap-2 mb-4'>
      <Text className='color-zinc-600 dark:color-zinc-300'>Settings</Text>
      <View className='w-full rounded-lg bg-zinc-200 dark:bg-zinc-800'>
        <Pressable
          className='flex-row items-center gap-2 px-4 py-2.5 border-b-2 border-white dark:border-black'
          onPress={() => router.navigate('/user/settings')}
        >
          <Icon
            name='setting'
            size={22}
            color={theme === 'dark' ? 'white' : 'black'}
          />
          <Text className='text-lg dark:color-white'>Settings</Text>
        </Pressable>
        <View className='flex-row items-center justify-between gap-2 px-4 py-2'>
          <View className='flex-row items-center gap-2'>
            <MaterialCommunityIcons
              name='bell'
              size={20}
              color={theme === 'dark' ? 'white' : 'black'}
            />
            <Text className='text-lg dark:color-white'>Daily reminder</Text>
          </View>
          <Switch
            trackColor={switchColors.trackColor}
            thumbColor={switchColors.thumbColor}
            ios_backgroundColor={switchColors.trackColor.false}
            onValueChange={() => setIsEnabledReminder(!isEnabledReminder)}
            value={isEnabledReminder}
          />
        </View>
      </View>
    </View>
  );
}
