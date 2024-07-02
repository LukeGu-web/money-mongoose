import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  Calendar as ClendarPicker,
  LocaleConfig,
} from 'react-native-calendars';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';

import CalendarDay from './CalendarDay';
import ListDayItem from '../RecordList/ListDayItem';
import { formatApiError } from 'api/errorFormat';
import { useGetRecordsByDateRange } from 'api/record/useGetRecordsByDateRange';
import { useRecordStore } from 'core/stateHooks';
import { useStyles, useTheme, TColors } from 'core/theme';
import { RecordsByDay } from 'api/record/types';

export default function Calendar() {
  const now = dayjs();
  const today = now.format('YYYY-MM-DD');

  const [selectedDay, setSelectedDay] = useState('');
  const [selctedMonth, setSelectedMonth] = useState(now.format('YYYY-MM-DD'));
  const [dailyRecords, setDailyRecords] = useState<RecordsByDay[]>([]);
  const records = useRecordStore((state) => state.records);
  const { theme, styles } = useStyles(createStyles);

  const handleBackToday = () => {
    setSelectedMonth(today);
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

  const handleSelectDay = (day: string, records: RecordsByDay) => {
    setSelectedDay(day);
    if (records) {
      setDailyRecords([records]);
    } else {
      setDailyRecords([]);
    }
  };

  return (
    <View style={styles.container}>
      <ClendarPicker
        style={styles.clendarContainer}
        initialDate={selctedMonth}
        dayComponent={({ date, state }) => (
          <CalendarDay
            date={date}
            state={state}
            selectedDate={selectedDay}
            onSelectDay={handleSelectDay}
            recordData={
              formattedData[date?.dateString! as keyof typeof formattedData]
            }
          />
        )}
        onMonthChange={(data) => {
          setSelectedMonth(data.dateString);
        }}
      />
      <Button title='back today' onPress={handleBackToday} />
      <View style={styles.recordsContainer}>
        {dailyRecords.length > 0 ? (
          <FlashList
            data={dailyRecords}
            renderItem={({ item }) => <ListDayItem item={item} />}
            estimatedItemSize={20}
          />
        ) : (
          <Text>No records</Text>
        )}
      </View>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    clendarContainer: {
      backgroundColor: theme.bgPrimary,
      borderRadius: 10,
      padding: 6,
    },
    recordsContainer: {
      flex: 1,
      borderRadius: 10,
      padding: 8,
      backgroundColor: '#ecf8f8',
    },
  });
