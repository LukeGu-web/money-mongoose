import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  Calendar as ClendarPicker,
  LocaleConfig,
} from 'react-native-calendars';
import dayjs from 'dayjs';

import CalendarDay from './CalendarDay';
import { formatApiError } from 'api/errorFormat';
import { useGetRecordsByDateRange } from 'api/record/useGetRecordsByDateRange';
import { useRecordStore } from 'core/stateHooks';
import { useStyles, useTheme, TColors } from 'core/theme';

export default function Calendar() {
  const now = dayjs();
  const [selectedDay, setSelectedDay] = useState('');
  const [selctedMonth, setSelectedMonth] = useState(now.format('YYYY-MM-DD'));
  const records = useRecordStore((state) => state.records);
  const { theme, styles } = useStyles(createStyles);

  const handleBackToday = () => {
    setSelectedMonth(now.format('YYYY-MM-DD'));
  };

  // const firstDay = now.subtract(1, 'month').format('YYYY-MM-DD');
  // const lastDay = now.add(1, 'month').format('YYYY-MM-DD');
  // const variables = {
  //   start_date: firstDay,
  //   end_date: lastDay,
  //   group_by_date: true,
  // };

  // const { isLoading, isError, data, error } = useGetRecordsByDateRange({
  //   variables,
  // });

  // console.log('Calendar - useGetRecordsByDateRange: ', data);

  // if (isLoading) return <Text>is loading...</Text>;

  // if (isError) {
  //   const formattedError = formatApiError(error);
  //   if (formattedError.status !== 404)
  //     return <Text>Sorry, something went wrong. Please try it again.</Text>;
  // }

  let formattedData = {};
  records.map((item) => {
    formattedData = { ...formattedData, [item.date]: item };
  });
  // console.log(formattedData);

  //recordData={formattedData[date]}
  return (
    <View style={styles.container}>
      <ClendarPicker
        style={styles.clendarContainer}
        initialDate={selctedMonth}
        dayComponent={({ date, state }) => (
          <CalendarDay
            date={date}
            state={state}
            recordData={
              formattedData[date?.dateString! as keyof typeof formattedData]
            }
          />
        )}
        onDayPress={(day) => {
          setSelectedDay(day.dateString);
        }}
        onMonthChange={(data) => {
          // console.log('onMonthChange: ', data);
          setSelectedMonth(data.dateString);
        }}
        hideExtraDays={true}
        markedDates={{
          [selectedDay]: {
            selected: true,
            // disableTouchEvent: true,
            selectedColor: 'green',
          },
        }}
      />
      <Button title='back today' onPress={handleBackToday} />
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: 'red',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    clendarContainer: {
      backgroundColor: theme.bgPrimary,
      borderRadius: 10,
      padding: 6,
    },
  });
