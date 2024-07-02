import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Calendar as ClendarPicker,
  LocaleConfig,
} from 'react-native-calendars';
import { FlashList } from '@shopify/flash-list';
import { useShallow } from 'zustand/react/shallow';
import dayjs from 'dayjs';

import CalendarDay from './CalendarDay';
import ListDayItem from '../RecordList/ListDayItem';
import { RecordsByDay } from 'api/record/types';
import { formatApiError } from 'api/errorFormat';
import { useGetRecordsByDateRange } from 'api/record/useGetRecordsByDateRange';
import { useRecordStore, useCalendar } from 'core/stateHooks';
import { useStyles, TColors } from 'core/theme';

export default function Calendar() {
  const { styles } = useStyles(createStyles);

  const now = dayjs();
  const today = now.format('YYYY-MM-DD');

  const [selectedDay, setSelectedDay] = useState(today);
  const [dailyRecords, setDailyRecords] = useState<RecordsByDay[]>([]);
  const records = useRecordStore((state) => state.records);
  const { visiableMonth, setVisiableMonth } = useCalendar(
    useShallow((state) => ({
      visiableMonth: state.visiableMonth,
      setVisiableMonth: state.setVisiableMonth,
    }))
  );

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
        initialDate={visiableMonth}
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
          setVisiableMonth(data.dateString);
        }}
      />
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
      borderRadius: 10,
      padding: 8,
    },
    recordsContainer: {
      flex: 1,
      borderRadius: 10,
      padding: 8,
      backgroundColor: '#ecf8f8',
    },
  });
