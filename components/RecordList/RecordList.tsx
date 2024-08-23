import { useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import EmptyRecordList from './EmptyRecordList';
import { useRecord, useRecordStore } from 'core/stateHooks';
import ListDayItem from './ListDayItem';
import RecordBottomSheet from '../BottomSheet/RecordBottomSheet';
import Icon from '../Icon/Icon';

export default function RecordList() {
  const records = useRecordStore((state) => state.records);
  const resetRecord = useRecord((state) => state.resetRecord);
  const latestRecords = records
    .slice(0, 8)
    .filter((item) =>
      dayjs(item?.date).isAfter(dayjs().subtract(6, 'day'), 'day')
    );
  const isUpdated =
    latestRecords.length > 0 && dayjs().isAfter(dayjs(latestRecords[0].date));
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressItem = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissItem = () => {
    resetRecord();
  };

  return (
    <View className='flex-1 rounded-lg bg-zinc-100'>
      <View className='flex-row items-center justify-between p-2'>
        <Text className='text-2xl font-semibold'>Last 7 days</Text>
        <TouchableOpacity
          className='flex-row items-center justify-between gap-1'
          onPress={() => router.navigate('/records')}
        >
          <Text>All records</Text>
          <Icon name='double-right' size={14} color='black' />
        </TouchableOpacity>
      </View>
      {isUpdated ? (
        <View className='flex-1'>
          <FlashList
            data={latestRecords}
            renderItem={({ item }) => (
              <ListDayItem item={item} onPress={handlePressItem} />
            )}
            estimatedItemSize={200}
          />
          <RecordBottomSheet
            bottomSheetModalRef={bottomSheetModalRef}
            onDismiss={handleDismissItem}
          />
        </View>
      ) : (
        <View className='items-center justify-center flex-1'>
          <EmptyRecordList noItemMsg='No record in last 7 days' />
        </View>
      )}
    </View>
  );
}
