import { Tabs, SplashScreen, Redirect } from 'expo-router';
import {
  CalendarHeader,
  RecordHeader,
  RecordsHeader,
  Icon,
  AddBankHeader,
} from 'components';
import { useLocalStore } from 'core/stateHooks';

export default function TabLayout() {
  // const hideSplash = useCallback(async () => {
  //   await SplashScreen.hideAsync();
  // }, []);
  const isOnBoarding = useLocalStore((state) => state.isOnBoarding);
  if (!isOnBoarding) {
    return <Redirect href='/onboarding' />;
  }
  const hideTab = ['record', 'add-bank-account', 'records/index'];
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
          tabBarIcon: ({ color }) => (
            <Icon size={28} name='home' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Calendar',
          headerTitle: () => <CalendarHeader />,
          tabBarIcon: ({ color }) => (
            <Icon name='calendar' size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='record'
        options={{
          title: 'Record',
          headerTitle: () => <RecordHeader />,
          tabBarIcon: ({ color }) => (
            <Icon name='record' size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='asset'
        options={{
          title: 'Asset',
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
      <Tabs.Screen
        name='records/index'
        options={{
          headerTitle: () => <RecordsHeader />,
          href: null,
        }}
      />
      <Tabs.Screen
        name='add-bank-account'
        options={{
          headerTitle: () => <AddBankHeader />,
          href: null,
        }}
      />
    </Tabs>
  );
}
