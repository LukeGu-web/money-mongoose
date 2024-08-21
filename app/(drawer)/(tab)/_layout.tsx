import { useCallback, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Tabs, SplashScreen, Redirect, Link, useNavigation } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { RecordHeader, Icon } from 'components';
import { useLocalStore, useCalendar } from 'core/stateHooks';
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

  const isOnBoarding = useLocalStore((state) => state.isOnBoarding);
  if (!isOnBoarding) {
    return <Redirect href='/onboarding' />;
  }

  const setVisiableMonth = useCalendar((state) => state.setVisiableMonth);
  const navigation = useNavigation();

  const handleBackToday = () => {
    log.info('Back Today');
    setVisiableMonth(dayjs().format('YYYY-MM-DD'));
  };

  const hideTab = ['record'];
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#03045E' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#03045E',
        tabBarStyle: {
          display: hideTab.includes(route.name) ? 'none' : 'flex',
        },
      })}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerLeft: () => <DrawerToggleButton tintColor='#fff' />,
          headerRight: () => (
            <Link href='/records' className='pr-3'>
              <Entypo name='text-document' size={24} color='#fff' />
            </Link>
          ),
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
            <TouchableOpacity className='pr-3' onPress={handleBackToday}>
              <Icon name='center_focus' size={24} color='#fff' />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Icon name='calendar' size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='record'
        options={{
          title: 'Record',
          tabBarLabelStyle: { color: '#f7b05b', fontWeight: 600 },
          headerTitle: () => <RecordHeader />,
          tabBarIcon: () => <Icon name='record' size={32} color='#f7b05b' />,
        }}
      />
      <Tabs.Screen
        name='asset'
        options={{
          title: 'Asset',
          headerLeft: () => (
            <Link href='/' className='pl-3'>
              <Icon name='chart-line' size={24} color='#fff' />
            </Link>
          ),
          headerRight: () => (
            <Link href='/asset/management' className='pr-3'>
              <Icon name='credit-card-multiple' size={24} color='#fff' />
            </Link>
          ),
          tabBarIcon: ({ color }) => (
            <Icon name='asset' size={28} color={color} />
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
