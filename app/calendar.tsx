import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  Calendar as ClendarPicker,
  LocaleConfig,
} from 'react-native-calendars';
import { CalendarDay } from 'components';

export default function Calendar() {
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <ClendarPicker
        dayComponent={({ date, state }) => (
          <CalendarDay date={date} state={state} />
        )}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'green',
          },
        }}
      />
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
