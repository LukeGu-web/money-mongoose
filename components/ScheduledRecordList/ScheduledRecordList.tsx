import { useRef, useCallback } from 'react';
import { Alert, View, Text, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useShallow } from 'zustand/react/shallow';

import { useGetFlatAssets } from 'api/asset';
import {
  useGetScheduledRecordList,
  useDeleteScheduledRecord,
  usePauseScheduledRecord,
  useResumeScheduledRecord,
} from 'api/period';
import { ScheduledRecordResponseType, TaskStatusTypes } from 'api/period/types';
import { formatApiError } from 'api/errorFormat';
import { useBookStore, useScheduledRecord } from 'core/stateHooks';
import log from 'core/logger';
import { successToaster } from 'core/toaster';
import EditOptionsBottomSheet from '../BottomSheet/EditOptionsBottomSheet';
import ListItem from './ListItem';
const noDataImage = require('../../assets/illustrations/nodata/no-data-board.png');

enum actionTypes {
  DELETE = 'delete',
  PAUSE = 'pause',
  RESUME = 'resume',
}

export default function ScheduledRecordList() {
  const router = useRouter();
  const currentBook = useBookStore((state) => state.currentBook);
  const { scheduledRecord, resetScheduledRecord } = useScheduledRecord(
    useShallow((state) => ({
      scheduledRecord: state.scheduledRecord,
      resetScheduledRecord: state.resetScheduledRecord,
    }))
  );
  const { isPending, isError, error, data, isFetching } =
    useGetScheduledRecordList();
  const { data: flatAssets } = useGetFlatAssets({
    variables: { book_id: currentBook.id },
  });

  const { mutate: deleteApi } = useDeleteScheduledRecord();
  const { mutate: pauseApi } = usePauseScheduledRecord();
  const { mutate: resumeApi } = useResumeScheduledRecord();
  const apis = {
    delete: deleteApi,
    pause: pauseApi,
    resume: resumeApi,
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleAction = (action: actionTypes) =>
    Alert.alert(
      `${action.toUpperCase()} Period Record`,
      `Are you sure you want to ${action} this period record?`,
      [
        {
          text: 'Cancel',
          onPress: handleCloseSheet,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            apis[action](
              { id: scheduledRecord.id as number },
              {
                onSuccess: () => {
                  successToaster(`${action} period schedule successfully!`);
                  log.success(`${action} period schedule successfully!`);
                  resetScheduledRecord();
                  handleCloseSheet();
                },
                onError: (error) => {
                  log.error('Error: ', formatApiError(error));
                },
              }
            );
          },
        },
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
    ...(scheduledRecord.execution_count > 0 && {
      Records: () => {
        handleCloseSheet();
        router.push('/records/period-generated-records');
      },
    }),
    Edit: () => {
      handleCloseSheet();
      router.push('/records/period-builder');
    },
    ...(scheduledRecord.status !== TaskStatusTypes.COMPLETED &&
      (scheduledRecord.status === TaskStatusTypes.PAUSED
        ? {
            Resume: () => handleAction(actionTypes.RESUME),
          }
        : {
            Pause: () => handleAction(actionTypes.PAUSE),
          })),
    Delete: () => handleAction(actionTypes.DELETE),
  };

  return (
    <View className='flex-1 px-2'>
      <FlashList
        data={data}
        renderItem={({ item }: { item: ScheduledRecordResponseType }) => (
          <ListItem
            item={item}
            flatAssets={flatAssets}
            onPress={() => bottomSheetModalRef.current?.present()}
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
