import { useCallback, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { Tabs, SplashScreen, Redirect, Link, router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import dayjs from 'dayjs';
import { colorScheme } from 'nativewind';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { Settings } from 'react-native-fbsdk-next';

import { Icon } from 'components';
import { useLocalStore, useSettingStore, useCalendar } from 'core/stateHooks';
import log from 'core/logger';

export default function TabLayout() {
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      hideSplash();
    }, 1000);
  }, [hideSplash]);

  useEffect(() => {
    const requestTracking = async () => {
      const { status } = await requestTrackingPermissionsAsync();
      Settings.initializeSDK();
      if (status === 'granted') {
        await Settings.setAdvertiserTrackingEnabled(true);
      }
    };
    requestTracking();
  }, []);

  const isOnBoarding = useLocalStore((state) => state.isOnBoarding);
  if (!isOnBoarding) {
    return <Redirect href='/user/onboarding' />;
  }

  const theme = useSettingStore((state) => state.theme);
  // Use imperatively
  colorScheme.set(theme);
  const setVisiableMonth = useCalendar((state) => state.setVisiableMonth);
  const handleBackToday = () => {
    log.info('Back Today');
    setVisiableMonth(dayjs().format('YYYY-MM-DD'));
  };

  const hideTab = ['record'];
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#03045E' },
        headerTintColor: 'white',
        tabBarActiveTintColor: theme === 'dark' ? '#60a5fa' : '#03045E',
        tabBarStyle: {
          display: hideTab.includes(route.name) ? 'none' : 'flex',
          backgroundColor: theme === 'dark' ? 'black' : 'white',
        },
      })}
    >
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon size={28} name='home' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Calendar',
          headerRight: () => (
            <View className='flex-row gap-2'>
              <Link className='pt-0.5 pr-3' href='/statistics/category/'>
                <AntDesign name='piechart' size={20} color='white' />
              </Link>
              <Pressable className='pr-3' onPress={handleBackToday}>
                <Icon name='center_focus' size={24} color='white' />
              </Pressable>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <Icon name='calendar' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='record'
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name='record' size={30} color='#f7b05b' />,
        }}
      />
      <Tabs.Screen
        name='asset'
        options={{
          title: 'Asset',
          headerRight: () => (
            <Link href='/asset/management' className='pr-3'>
              <Icon name='credit-card-multiple' size={24} color='white' />
            </Link>
          ),
          tabBarIcon: ({ color }) => (
            <Icon name='asset' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <Icon name='account' size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
