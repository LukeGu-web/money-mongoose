import { useState, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Calendar as ClendarPicker, DateData } from 'react-native-calendars';
import { usePathname } from 'expo-router';
import dayjs from 'dayjs';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useGetAllRecords } from 'api/record';
import { formatApiError } from 'api/errorFormat';
import { RecordsByDay } from 'api/record/types';
import log from 'core/logger';
import { useRecord, useBookStore, useCalendar } from 'core/stateHooks';
import CalendarDay from './CalendarDay';
import ListDayItem from '../RecordList/ListDayItem';
import RecordBottomSheet from '../BottomSheet/RecordBottomSheet';

export default function Calendar() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const path = usePathname();
  const resetRecord = useRecord((state) => state.resetRecord);
  const { visiableMonth, setVisiableMonth } = useCalendar();
  const currentBook = useBookStore((state) => state.currentBook);
  const now = dayjs();
  const today = now.format('YYYY-MM-DD');
  const [selectedDay, setSelectedDay] = useState(today);
  const [page, setPage] = useState(1);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useGetAllRecords({
      variables: { book_id: currentBook.id, page, extra: '' },
    });

  if (isPending || isFetching)
    return (
      <View className='items-center justify-center flex-1 gap-2'>
        <ActivityIndicator size='large' />
        <Text>Loading data...</Text>
      </View>
    );

  if (isError) {
    // const formattedError = formatApiError(error);
    log.error(error.message);
    // if (formattedError.status !== 404)
    return <Text>Sorry, something went wrong. Please try it again.</Text>;
  }

  const handleMonthChange = (dateData: DateData) => {
    const diffMonth = dayjs(visiableMonth).diff(dateData.dateString, 'month');
    // previous month
    if (diffMonth === 1 && !isPlaceholderData && data.next) {
      setPage((old) => old + 1);
    }
    // next month
    if (diffMonth === -1) {
      setPage((old) => Math.max(old - 1, 1));
    }
    setVisiableMonth(dateData.dateString);
  };

  const handlePressItem = () => {
    bottomSheetModalRef.current?.present();
  };
  const handleDismissItem = () => {
    if (path !== '/record') resetRecord();
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
            onSelectDay={setSelectedDay}
            recordData={data.results.find(
              (item: RecordsByDay) => item.date === date?.dateString
            )}
          />
        )}
        onMonthChange={handleMonthChange}
      />
      <View className='flex-1 p-2 rounded-lg bg-sky-100'>
        {data.results.find(
          (item: RecordsByDay) => item.date === selectedDay
        ) ? (
          <FlashList
            data={[
              data.results.find(
                (item: RecordsByDay) => item.date === selectedDay
              ) as RecordsByDay,
            ]}
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
      </View>
      <RecordBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onDismiss={handleDismissItem}
      />
    </View>
  );
}
