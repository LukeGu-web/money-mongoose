import { useState, useRef } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Calendar as ClendarPicker, DateData } from 'react-native-calendars';
import { usePathname } from 'expo-router';
import dayjs from 'dayjs';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useGetFlatAssets } from 'api/asset';
import { useGetAllRecords } from 'api/record';
import { RecordsByDay } from 'api/record/types';
import log from 'core/logger';
import {
  useRecord,
  useBookStore,
  useSettingStore,
  useCalendar,
} from 'core/stateHooks';
import CalendarDay from './CalendarDay';
import ListDayItem from '../RecordList/ListDayItem';
import RecordBottomSheet from '../BottomSheet/RecordBottomSheet';

const noDataImage = require('../../assets/illustrations/nodata/no-data-board.png');

const getStartDate = (date: string) =>
  dayjs(date).startOf('M').startOf('w').subtract(1, 'day').format('YYYY-MM-DD');

const getEndDate = (date: string) =>
  dayjs(date).endOf('M').endOf('w').add(1, 'day').format('YYYY-MM-DD');

export default function Calendar() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const path = usePathname();
  const resetRecord = useRecord((state) => state.resetRecord);
  const theme = useSettingStore((state) => state.theme);
  const { visiableMonth, setVisiableMonth } = useCalendar();
  const currentBook = useBookStore((state) => state.currentBook);
  const now = dayjs();
  const today = now.format('YYYY-MM-DD');
  const [selectedDay, setSelectedDay] = useState(today);
  const [extra, setExtra] = useState(
    `&date_after=${getStartDate(today)}&date_before=${getEndDate(today)}`
  );

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useGetAllRecords({
      variables: {
        book_id: currentBook.id,
        page: 1,
        extra,
      },
    });
  const { data: flatAssets } = useGetFlatAssets({
    variables: { book_id: currentBook.id },
  });

  if (isError) {
    log.error(error.message);
    // if (formattedError.status !== 404)
    return <Text>Sorry, something went wrong. Please try it again.</Text>;
  }

  const handleMonthChange = (dateData: DateData) => {
    const newDate = dateData.dateString;
    const startDate = getStartDate(newDate),
      endDate = getEndDate(newDate);
    setExtra(`&date_after=${startDate}&date_before=${endDate}`);
    setVisiableMonth(newDate);
  };

  const handlePressItem = () => {
    bottomSheetModalRef.current?.present();
  };
  const handleDismissItem = () => {
    if (path !== '/record') resetRecord();
  };

  return (
    <View className='flex-1 gap-2'>
      <ClendarPicker
        key={theme}
        enableSwipeMonths={true}
        style={{ borderRadius: 10, padding: 8 }}
        theme={{
          calendarBackground: theme === 'dark' ? '#d6d3d1' : '#ffffff',
          textSectionTitleColor: theme === 'dark' ? '#ffffff' : '#94a3b8',
        }}
        initialDate={visiableMonth}
        dayComponent={({ date, state }: { date: any; state: any }) => (
          <CalendarDay
            isLoading={isFetching}
            date={date}
            state={state}
            selectedDate={selectedDay}
            onSelectDay={setSelectedDay}
            recordData={data?.results.find(
              (item: RecordsByDay) => item.date === date?.dateString
            )}
          />
        )}
        onMonthChange={handleMonthChange}
      />
      <View className='flex-1 p-2 rounded-lg bg-sky-100 dark:bg-sky-900'>
        {data?.results.find(
          (item: RecordsByDay) => item.date === selectedDay
        ) && flatAssets ? (
          <FlashList
            data={[
              data?.results.find(
                (item: RecordsByDay) => item.date === selectedDay
              ) as RecordsByDay,
            ]}
            renderItem={({ item }) => (
              <ListDayItem
                item={item}
                flatAssets={flatAssets}
                onPress={handlePressItem}
              />
            )}
            estimatedItemSize={20}
          />
        ) : (
          <ScrollView className='flex-1'>
            <View className='self-center justify-center flex-1 gap-4'>
              <Image className='w-32 h-32' source={noDataImage} />
              <Text className='text-lg font-medium text-center dark:color-white'>
                No record
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
      <RecordBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onDismiss={handleDismissItem}
      />
    </View>
  );
}
