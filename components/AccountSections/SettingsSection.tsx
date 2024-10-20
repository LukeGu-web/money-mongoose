import { View, Text, Pressable, Switch } from 'react-native';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSettingStore } from 'core/stateHooks';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from '../Icon/Icon';

export default function SettingsSection() {
  const {
    isEnabledReminder,
    setIsEnabledReminder,
    reminderId,
    setReminderId,
    reminderTime,
    setReminderTime,
    theme,
  } = useSettingStore();
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

  const scheduleDailyReminder = async (time: Date) => {
    const trigger = new Date(time);
    trigger.setSeconds(0); // Ensures it triggers exactly at the selected minute

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Reminder',
        body: 'Any expenses to record today?',
      },
      trigger: {
        hour: trigger.getHours(),
        minute: trigger.getMinutes(),
        repeats: true,
      },
    });

    setReminderId(id);
  };

  const cancelNotification = async () => {
    if (reminderId) {
      await Notifications.cancelScheduledNotificationAsync(reminderId);
      setReminderId(null);
    }
  };

  const handleReminderToggle = async () => {
    setIsEnabledReminder(!isEnabledReminder);
    if (!isEnabledReminder) {
      // Schedule notification
      await scheduleDailyReminder(reminderTime);
    } else {
      // Cancel notification
      await cancelNotification();
    }
  };

  const handleChangeReminderTime = async (selectedDate: Date) => {
    setReminderTime(selectedDate);
    await scheduleDailyReminder(reminderTime);
  };

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
            onValueChange={handleReminderToggle}
            value={isEnabledReminder}
          />
        </View>
        {isEnabledReminder && (
          <View className='flex-row items-center justify-between px-4 py-3 border-b-2 border-white rounded-b-lg dark:border-black bg-zinc-300 dark:bg-zinc-900 border-x-2'>
            <View className='flex-row items-center gap-2'>
              <MaterialCommunityIcons
                name='timer'
                size={20}
                color={theme === 'dark' ? 'white' : 'black'}
              />
              <Text className='dark:color-white'>Per day at</Text>
            </View>
            <DateTimePicker
              key={theme}
              style={{ width: 90 }}
              value={new Date(reminderTime)}
              mode='time'
              display='compact'
              themeVariant={theme}
              onChange={(e: any, selectedDate: any) => {
                if (selectedDate) handleChangeReminderTime(selectedDate);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
