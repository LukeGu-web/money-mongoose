import { View, Text, Image, ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';
import { FlashList } from '@shopify/flash-list';

import { useGetFlatAssets } from 'api/asset';
import { useGetScheduledRecordDetails } from 'api/period';
import { RecordAPI } from 'api/record/types';
import { useBookStore, useScheduledRecord } from 'core/stateHooks';

import ListItem from '../RecordList/ListItem';
const noDataImage = require('../../assets/illustrations/nodata/no-data-board.png');

export default function GeneratedRecordList() {
  const currentBook = useBookStore((state) => state.currentBook);
  const scheduledRecord = useScheduledRecord((state) => state.scheduledRecord);
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useGetScheduledRecordDetails({
      variables: { id: scheduledRecord.id as number },
    });
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
    <FlashList
      contentContainerStyle={{ paddingHorizontal: 8 }}
      data={data?.generated_records}
      renderItem={({ item }: { item: RecordAPI }) => (
        <View key={item.id} className='pt-2'>
          <Text className='text-lg font-bold dark:color-white'>
            {dayjs(item.date).format('D MMM YYYY ddd')}
          </Text>
          <ListItem item={item} flatAssets={flatAssets} onPress={() => {}} />
        </View>
      )}
      estimatedItemSize={20}
      ListFooterComponent={() => (
        <Text className='w-full mt-4 text-center dark:color-white'>
          - The End -
        </Text>
      )}
      ListEmptyComponent={() => (
        <View className='items-center justify-center flex-1 gap-4'>
          <Image className='w-32 h-32' source={noDataImage} />
          <Text className='dark:color-white'>No genereated record</Text>
        </View>
      )}
    />
  );
}
