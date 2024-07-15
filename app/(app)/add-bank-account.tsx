import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar as CalendarView } from 'components';

export default function AddBankAccount() {
  return (
    <View style={styles.container}>
      <Text>Add bank</Text>
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 6,
    padding: 5,
    backgroundColor: '#fff',
  },
});
