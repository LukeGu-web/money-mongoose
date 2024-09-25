import { useState, useCallback, useRef } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { usePathname } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { RecordsByDay } from 'api/record/types';
import { useGetFlatAssets } from 'api/asset';
import { useGetAllRecords } from 'api/record';
import log from 'core/logger';
import { useRecord, useBookStore } from 'core/stateHooks';
import RecordBottomSheet from '../BottomSheet/RecordBottomSheet';
import ListDayItem from './ListDayItem';
const noDataImage = require('../../assets/illustrations/nodata/no-data-board.png');

type RecordListProps = {
  extra?: string;
  noItemMsg?: string;
  loadMore?: boolean;
  bgColor?: string;
  darkBgColor?: string;
};

export default function RecordList({
  extra = '',
  noItemMsg = "You don't have any record.",
  loadMore = true,
  bgColor = 'bg-white',
  darkBgColor = 'bg-zinc-600',
}: RecordListProps) {
  const path = usePathname();
  const currentBook = useBookStore((state) => state.currentBook);
  const [page, setPage] = useState(1);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useGetAllRecords({ variables: { book_id: currentBook.id, page, extra } });

  const { data: flatAssets } = useGetFlatAssets({
    variables: { book_id: currentBook.id },
  });

  const resetRecord = useRecord((state) => state.resetRecord);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressItem = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissItem = () => {
    if (path !== '/record') resetRecord();
  };

  if (isPending || isFetching || !flatAssets)
    return (
      <View
        className={`items-center justify-center flex-1 gap-2 ${bgColor} dark:${darkBgColor}`}
      >
        <ActivityIndicator size='large' />
        <Text>Loading data...</Text>
      </View>
    );

  if (isError) {
    // const formattedError = formatApiError(error);
    log.error(error.message);
    // if (formattedError.status !== 404)
    return (
      <View
        className={`items-center justify-center flex-1 gap-2 ${bgColor} dark:${darkBgColor}`}
      >
        <Text>Sorry, something went wrong. Please try it again.</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 p-2 ${bgColor} dark:${darkBgColor}`}>
      {data.results.length > 0 ? (
        <FlashList
          data={data.results}
          renderItem={({ item }: { item: RecordsByDay }) => (
            <ListDayItem
              item={item}
              flatAssets={flatAssets}
              onPress={handlePressItem}
            />
          )}
          estimatedItemSize={50}
          onEndReachedThreshold={5}
          onEndReached={() => {
            if (!isPlaceholderData && data.next && loadMore) {
              setPage((old) => old + 1);
            }
          }}
          ListFooterComponent={() => (
            <Text className='w-full mt-4 text-center dark:color-white'>
              - The End -
            </Text>
          )}
        />
      ) : (
        <View className='items-center justify-center flex-1 gap-4'>
          <Image className='w-32 h-32' source={noDataImage} />
          <Text className='dark:color-white'>{noItemMsg}</Text>
        </View>
      )}
      <RecordBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onDismiss={handleDismissItem}
      />
    </View>
  );
}
