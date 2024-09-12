import { useState, useCallback, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { usePathname } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { RecordsByDay } from 'api/record/types';
import { useGetAllRecords } from 'api/record';
import { formatApiError } from 'api/errorFormat';
import log from 'core/logger';
import { useRecord, useBookStore } from 'core/stateHooks';
import RecordBottomSheet from '../BottomSheet/RecordBottomSheet';
import ListDayItem from './ListDayItem';

type RecordListProps = {
  extra?: string;
  noItemMsg?: string;
  loadMore?: boolean;
  bgColor?: string;
};

export default function RecordList({
  extra = '',
  noItemMsg = "You don't have any record.",
  loadMore = true,
  bgColor = 'bg-white',
}: RecordListProps) {
  const path = usePathname();
  const currentBook = useBookStore((state) => state.currentBook);
  const [page, setPage] = useState(1);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useGetAllRecords({ variables: { book_id: currentBook.id, page, extra } });

  const resetRecord = useRecord((state) => state.resetRecord);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressItem = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissItem = () => {
    if (path !== '/record') resetRecord();
  };

  if (isPending || isFetching)
    return (
      <View className={`items-center justify-center flex-1 gap-2 ${bgColor}`}>
        <ActivityIndicator size='large' />
        <Text>Loading data...</Text>
      </View>
    );

  if (isError) {
    // const formattedError = formatApiError(error);
    log.error(error.message);
    // if (formattedError.status !== 404)
    return (
      <View className={`items-center justify-center flex-1 gap-2 ${bgColor}`}>
        <Text>Sorry, something went wrong. Please try it again.</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 p-2 ${bgColor}`}>
      {data.results.length > 0 ? (
        <FlashList
          data={data.results}
          renderItem={({ item }: { item: RecordsByDay }) => (
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
            <Text className='w-full mt-4 text-center'>- The End -</Text>
          )}
        />
      ) : (
        <View className='items-center justify-center flex-1'>
          <Text>{noItemMsg}</Text>
        </View>
      )}
      <RecordBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onDismiss={handleDismissItem}
      />
    </View>
  );
}
