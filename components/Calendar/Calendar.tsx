import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View } from 'react-native';
import { Calendar as ClendarPicker, DateData } from 'react-native-calendars';
import { FlashList } from '@shopify/flash-list';
import { useShallow } from 'zustand/react/shallow';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import RecordBottomSheet from '../BottomSheet/RecordBottomSheet';
import CalendarDay from './CalendarDay';
import ListDayItem from '../RecordList/ListDayItem';
import { RecordsByDay } from 'api/record/types';
// import { formatApiError } from 'api/errorFormat';
// import { useGetRecordsByDateRange } from 'api/record/useGetAllRecords';
import { useRecord, useRecordStore, useCalendar } from 'core/stateHooks';

export default function Calendar() {
  const records = useRecordStore((state) => state.records);
  const resetRecord = useRecord((state) => state.resetRecord);
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

  // log.success('Calendar - useGetRecordsByDateRange: ', data);

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

  const handleDismissItem = () => {
    resetRecord();
  };

  return (
    <View className='flex-1'>
      <ClendarPicker
        enableSwipeMonths={true}
        style={{ borderRadius: 10, padding: 8 }}
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
      <View className='flex-1 p-2 rounded-lg bg-sky-100'>
        {dailyRecords.length > 0 ? (
          <FlashList
            data={dailyRecords}
            renderItem={({ item }) => (
              <ListDayItem item={item} onPress={handlePressItem} />
            )}
            estimatedItemSize={20}
          />
        ) : (
          <View className='self-center justify-center flex-1'>
            <Text className='text-xl font-medium'>No record</Text>
          </View>
        )}
        <RecordBottomSheet
          bottomSheetModalRef={bottomSheetModalRef}
          onDismiss={handleDismissItem}
        />
      </View>
    </View>
  );
}
