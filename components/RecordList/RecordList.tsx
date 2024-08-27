import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { usePathname } from 'expo-router';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import { client } from 'api/client';
import { formatApiError } from 'api/errorFormat';
import log from 'core/logger';
import { useRecord, useRecordStore, useBookStore } from 'core/stateHooks';
import RecordBottomSheet from '../BottomSheet/RecordBottomSheet';
import ListDayItem from './ListDayItem';

type RecordListProps = {
  extra?: string;
  noItemMsg?: string;
  loadMore?: boolean;
};

export default function RecordList({
  extra = '',
  noItemMsg,
  loadMore = true,
}: RecordListProps) {
  const path = usePathname();
  const { records, setRecords } = useRecordStore();
  const currentBook = useBookStore((state) => state.currentBook);
  const [page, setPage] = useState(1);

  const getRecords = (page = 1) =>
    client
      .get(`/record/combined/?page=${page}&book_id=${currentBook.id}${extra}`)
      .then((response) => response.data);

  const {
    isPending,
    isError,
    error,
    data,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => getRecords(page),
    placeholderData: keepPreviousData,
  });

  const resetRecord = useRecord((state) => state.resetRecord);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    refetch();
  }, [extra]);

  const handlePressItem = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissItem = () => {
    if (path !== '/record') resetRecord();
  };

  useEffect(() => {
    if (data) {
      setRecords(data.results);
    }
  }, [data, setRecords]);

  if (isPending || isFetching)
    return (
      <View className='items-center justify-center flex-1 gap-2 bg-white'>
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

  return (
    <View className='flex-1 p-2 bg-white'>
      {records.length > 0 ? (
        <FlashList
          data={records}
          renderItem={({ item }) => (
            <ListDayItem item={item} onPress={handlePressItem} />
          )}
          estimatedItemSize={50}
          onEndReachedThreshold={5}
          onEndReached={() => {
            if (!isPlaceholderData && data.next && loadMore) {
              setPage((old) => old + 1);
            }
          }}
          ListFooterComponent={() => (
            <Text className='w-full mt-4 text-center'>The End</Text>
          )}
        />
      ) : (
        <View className='items-center justify-center flex-1'>
          <Text>{noItemMsg ?? "You don't have any record."}</Text>
        </View>
      )}
      <RecordBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onDismiss={handleDismissItem}
      />
    </View>
  );
}
