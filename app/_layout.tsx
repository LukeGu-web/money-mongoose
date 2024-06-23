import React from 'react';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import 'react-native-get-random-values';

import { RecordHeader } from 'components';
import { APIProvider } from 'api/api-provider';

export default function TabLayout() {
  return (
    <APIProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#03045E' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#03045e',
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
              <FontAwesome size={28} name='home' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='calendar'
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color }) => (
              <Ionicons name='calendar-number' size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='record'
          options={{
            title: 'Record',
            headerTitle: () => <RecordHeader />,
            tabBarIcon: ({ color }) => (
              <AntDesign name='pluscircle' size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='asset'
          options={{
            title: 'Asset',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='gold' size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='account'
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='account' size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </APIProvider>
  );
}
