// import { useEffect } from 'react';
// import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import 'react-native-get-random-values';
import Toast from 'react-native-toast-message';

import { RecordHeader, Icon } from 'components';
import { APIProvider } from 'api/api-provider';
// import { Colors, useTheme } from 'core/theme';

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    fontello: require('../assets/fontello.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  // const colorScheme = useColorScheme();
  // const colorScheme = 'dark';
  // const { theme } = useTheme();

  // useEffect(() => {
  //   setTheme(colorScheme === 'dark' ? Colors.dark : Colors.light);
  // }, []);

  return (
    <APIProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#03045E' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#03045E',
          tabBarStyle: {
            display: route.name === 'record' ? 'none' : 'flex',
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
      </Tabs>
      <Toast />
    </APIProvider>
  );
}
