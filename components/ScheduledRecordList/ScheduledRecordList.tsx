import { useRef, useCallback, useState } from 'react';
import { Alert, View, Text, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useGetFlatAssets } from 'api/asset';
import { useGetScheduledRecordList } from 'api/period';
import { ScheduledRecordResponseType } from 'api/period/types';
import { useBookStore } from 'core/stateHooks';
import EditOptionsBottomSheet from '../BottomSheet/EditOptionsBottomSheet';
import ListItem from './ListItem';

const noDataImage = require('../../assets/illustrations/nodata/no-data-board.png');

export default function ScheduledRecordList() {
  const router = useRouter();
  const currentBook = useBookStore((state) => state.currentBook);
  const [numOfRecords, setNumOfRecords] = useState(0);
  const { isPending, isError, error, data, isFetching } =
    useGetScheduledRecordList();
  const { data: flatAssets } = useGetFlatAssets({
    variables: { book_id: currentBook.id },
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleDeleteAccount = () =>
    Alert.alert(
      'Delete Account',
      `Are you sure you want to delete this period record?`,
      [
        {
          text: 'Cancel',
          onPress: () => bottomSheetModalRef.current?.dismiss(),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => {} },
      ]
    );

  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  if (isPending || isFetching || !flatAssets)
    return (
      <View className='items-center justify-center flex-1 gap-2'>
        <ActivityIndicator size='large' />
        <Text>Loading data...</Text>
      </View>
    );

  const functions = {
    ...(numOfRecords > 0 && {
      Records: () => {
        bottomSheetModalRef.current?.dismiss();
        router.push('/records/period-generated-records');
      },
    }),
    Edit: () => {
      bottomSheetModalRef.current?.dismiss();
      router.push('/records/period-builder');
    },
    Pause: () => {
      bottomSheetModalRef.current?.dismiss();
    },
    Delete: handleDeleteAccount,
  };

  return (
    <View className='flex-1 px-2'>
      <FlashList
        data={data}
        renderItem={({ item }: { item: ScheduledRecordResponseType }) => (
          <ListItem
            item={item}
            flatAssets={flatAssets}
            onPress={() => {
              bottomSheetModalRef.current?.present();
              setNumOfRecords(item.execution_count);
            }}
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
      <EditOptionsBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        functions={functions}
        height={360}
        title='Scheduled record'
        onCancel={handleCloseSheet}
      />
    </View>
  );
}
