import { useState, useRef } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { useGetFlatAssets } from 'api/asset';
import { useGetScheduledRecordList } from 'api/period';
import { ScheduledRecordResponseType } from 'api/period/types';
import { useRecord, useBookStore } from 'core/stateHooks';
import ListItem from './ListItem';

const noDataImage = require('../../assets/illustrations/nodata/no-data-board.png');

export default function ScheduledRecordList() {
  const currentBook = useBookStore((state) => state.currentBook);
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useGetScheduledRecordList();

  const { data: flatAssets } = useGetFlatAssets({
    variables: { book_id: currentBook.id },
  });

  if (isPending || isFetching || !flatAssets)
    return (
      <View className='items-center justify-center flex-1 gap-2'>
        <ActivityIndicator size='large' />
        <Text>Loading data...</Text>
      </View>
    );

  return (
    <View className='flex-1 px-2'>
      <FlashList
        data={data}
        renderItem={({ item }: { item: ScheduledRecordResponseType }) => (
          <ListItem
            item={item}
            flatAssets={flatAssets}
            onPress={() => console.log(item)}
          />
        )}
        estimatedItemSize={10}
        ListEmptyComponent={() => (
          <View className='items-center justify-center flex-1 gap-4'>
            <Image className='w-32 h-32' source={noDataImage} />
            <Text className='dark:color-white'>
              You haven't created any periodic record.
            </Text>
          </View>
        )}
      />
    </View>
  );
}
