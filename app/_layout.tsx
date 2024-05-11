import React from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
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
        name='record'
        options={{
          title: 'Record',
          //   headerTitle:
          tabBarIcon: ({ color }) => (
            <AntDesign name='pluscircle' size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='diagram'
        options={{
          title: 'Diagram',
          tabBarIcon: ({ color }) => (
            <AntDesign name='piechart' size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
