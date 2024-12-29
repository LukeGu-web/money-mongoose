import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSettingStore, useUserStore } from 'core/stateHooks';
import log from 'core/logger';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from '../Icon/Icon';
import Switch from '../Switch/Switch';

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
  const user = useUserStore((state) => state.user);

  // Cleanup notifications when component unmounts or user changes
  useEffect(() => {
    return () => {
      cancelNotification();
    };
  }, [user.id]);

  const scheduleDailyReminder = async (time: Date) => {
    // First cancel any existing notification
    await cancelNotification();

    const trigger = new Date(time);
    trigger.setSeconds(0);

    try {
      // Check if we have permission first
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          setIsEnabledReminder(false);
          return;
        }
      }

      // Get all scheduled notifications first
      const scheduledNotifications =
        await Notifications.getAllScheduledNotificationsAsync();

      // Cancel any existing notifications with the same title
      for (const notification of scheduledNotifications) {
        if (notification.content.title === 'Daily Reminder') {
          await Notifications.cancelScheduledNotificationAsync(
            notification.identifier
          );
        }
      }

      // Schedule new notification
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Daily Reminder',
          body: 'Any expenses to record today?',
          data: { userId: user.id }, // Add user.id to identify notifications per user
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: trigger.getHours(),
          minute: trigger.getMinutes(),
        },
      });

      setReminderId(id);
      return id;
    } catch (error) {
      log.error('Error scheduling notification:', error);
      setIsEnabledReminder(false);
      return null;
    }
  };

  const cancelNotification = async () => {
    try {
      if (reminderId) {
        await Notifications.cancelScheduledNotificationAsync(reminderId);
        setReminderId(null);
      }

      // Also check for and cancel any other daily reminders that might exist
      const scheduledNotifications =
        await Notifications.getAllScheduledNotificationsAsync();
      for (const notification of scheduledNotifications) {
        if (
          notification.content.title === 'Daily Reminder' &&
          notification.content.data?.userId === user.id
        ) {
          await Notifications.cancelScheduledNotificationAsync(
            notification.identifier
          );
        }
      }
    } catch (error) {
      log.error('Error canceling notification:', error);
    }
  };

  const handleReminderToggle = async () => {
    const newEnabledState = !isEnabledReminder;

    try {
      if (newEnabledState) {
        // Schedule notification for current time
        const success = await scheduleDailyReminder(reminderTime);
        if (success) {
          setIsEnabledReminder(true);
        }
      } else {
        // Cancel notification
        await cancelNotification();
        await cleanupNotifications();
        setIsEnabledReminder(false);
      }
    } catch (error) {
      log.error('Error toggling reminder:', error);
      setIsEnabledReminder(false);
    }
  };

  const handleChangeReminderTime = async (selectedDate: Date) => {
    try {
      setReminderTime(selectedDate);
      if (isEnabledReminder) {
        await scheduleDailyReminder(selectedDate);
      }
    } catch (error) {
      log.error('Error changing reminder time:', error);
    }
  };

  const cleanupNotifications = async () => {
    try {
      // First, let's see what's currently scheduled
      const scheduledNotifications =
        await Notifications.getAllScheduledNotificationsAsync();
      log.info(
        'Before cleanup:',
        scheduledNotifications.length,
        'notifications'
      );

      // Clear only Daily Reminders
      for (const notification of scheduledNotifications) {
        if (notification.content.title === 'Daily Reminder') {
          await Notifications.cancelScheduledNotificationAsync(
            notification.identifier
          );
        }
      }

      // Verify cleanup
      const remainingNotifications =
        await Notifications.getAllScheduledNotificationsAsync();
      log.info(
        'After cleanup:',
        remainingNotifications.length,
        'notifications'
      );
    } catch (error) {
      log.error('Error cleaning up notifications:', error);
    }
  };

  return (
    <View className='items-start justify-center flex-1 gap-2 mb-4'>
      <Text className='color-zinc-600 dark:color-zinc-300'>Settings</Text>
      <View className='w-full rounded-lg bg-zinc-200 dark:bg-zinc-800'>
        <Pressable
          className='flex-row items-center gap-2 px-4 py-2.5 border-b-2 border-white dark:border-black'
          onPress={() => router.push('/user/settings')}
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
