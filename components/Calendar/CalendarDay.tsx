import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Record, RecordsByDay } from 'api/record/types';
import { DateData } from 'react-native-calendars';
import { useStyles, useTheme, TColors } from 'core/theme';

type CalendarDayType = {
  date: (string & DateData) | undefined;
  state: 'selected' | 'disabled' | 'inactive' | 'today' | '' | undefined;
  recordData?: RecordsByDay;
  selectedDate: string;
  onSelectDay: (day: string, records: RecordsByDay) => void;
};

export default function CalendarDay({
  date,
  state,
  recordData,
  selectedDate,
  onSelectDay,
}: CalendarDayType) {
  const { theme, styles } = useStyles(createStyles);
  // const [selected, setSelected] = useState<string | undefined>('');
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        onSelectDay(date?.dateString as string, recordData as RecordsByDay)
      }
    >
      <View
        style={[
          styles.dayWrapper,
          {
            backgroundColor:
              state === 'today'
                ? '#90e0ef'
                : date?.dateString === selectedDate
                ? '#f6bc66'
                : 'transparent',
          },
        ]}
      >
        <Text
          style={[
            styles.day,
            {
              color: state === 'disabled' ? 'gray' : theme.textPrimary,
            },
          ]}
        >
          {date?.day}
        </Text>
      </View>
      <Text style={styles.income}>
        {Math.abs(recordData?.sum_of_income as number) > 0 &&
          '+' + recordData?.sum_of_income}
      </Text>
      <Text style={styles.expense}>
        {Math.abs(recordData?.sum_of_expense as number) > 0 &&
          recordData?.sum_of_expense}
      </Text>
    </TouchableOpacity>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {},
    dayWrapper: {
      width: 28,
      height: 28,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
    },
    day: {
      textAlign: 'center',
    },
    income: {
      marginTop: 2,
      textAlign: 'center',
      color: theme.incomeTextColor,
      fontSize: 10,
    },
    expense: {
      textAlign: 'center',
      color: theme.expenseTextColor,
      fontSize: 10,
    },
  });
