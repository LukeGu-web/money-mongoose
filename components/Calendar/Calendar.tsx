import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar as ClendarPicker, DateData } from 'react-native-calendars';
import { FlashList } from '@shopify/flash-list';
import { useShallow } from 'zustand/react/shallow';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import RecordBottomSheet from '../BottomSheet/RecordBottomSheet';
import CalendarDay from './CalendarDay';
import ListDayItem from '../RecordList/ListDayItem';
import { RecordsByDay } from 'api/record/types';
import { formatApiError } from 'api/errorFormat';
import { useGetRecordsByDateRange } from 'api/record/useGetRecordsByDateRange';
import { useRecordStore, useCalendar } from 'core/stateHooks';
import { useStyles, TColors } from 'core/theme';

export default function Calendar() {
  const { styles } = useStyles(createStyles);
  const records = useRecordStore((state) => state.records);
  const { visiableMonth, setVisiableMonth } = useCalendar(
    useShallow((state) => ({
      visiableMonth: state.visiableMonth,
      setVisiableMonth: state.setVisiableMonth,
    }))
  );

  const now = dayjs();
  const today = now.format('YYYY-MM-DD');

  const [selectedDay, setSelectedDay] = useState(today);
  const [formattedData, setFormattedData] = useState({});
  const [dailyRecords, setDailyRecords] = useState<RecordsByDay[]>([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    setVisiableMonth(today);
  }, []);

  useEffect(() => {
    let format = {};
    records.map((item) => {
      format = { ...format, [item.date]: item };
    });
    setFormattedData(format);
    if (selectedDay === today) {
      const todayRecords = format[today as keyof typeof format];
      if (todayRecords) setDailyRecords([todayRecords]);
    }
  }, [records]);

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

  const handleSelectDay = (day: string, records: RecordsByDay) => {
    setSelectedDay(day);
    if (records) {
      setDailyRecords([records]);
    } else {
      setDailyRecords([]);
    }
  };

  const handlePressItem = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      <ClendarPicker
        enableSwipeMonths={true}
        style={styles.clendarContainer}
        initialDate={visiableMonth}
        dayComponent={({ date, state }: { date: any; state: any }) => (
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
        onMonthChange={(data: DateData) => {
          setVisiableMonth(data.dateString);
        }}
      />
      <View style={styles.recordsContainer}>
        {dailyRecords.length > 0 ? (
          <FlashList
            data={dailyRecords}
            renderItem={({ item }) => (
              <ListDayItem item={item} onPress={handlePressItem} />
            )}
            estimatedItemSize={20}
          />
        ) : (
          <Text>No records</Text>
        )}
        <RecordBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
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
