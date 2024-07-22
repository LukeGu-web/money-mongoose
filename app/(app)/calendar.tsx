import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar as CalendarView } from 'components';

export default function Calendar() {
  return (
    <View style={styles.container}>
      <CalendarView />
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 6,
    padding: 8,
    backgroundColor: '#fff',
  },
});
