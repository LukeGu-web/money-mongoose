import { useCallback, useRef } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import { useRecord, useRecordStore } from 'core/stateHooks';
import { RecordBottomSheet, EmptyRecordList, ListDayItem } from 'components';

export default function Records() {
  const records = useRecordStore((state) => state.records);
  const resetRecord = useRecord((state) => state.resetRecord);
  const isUpdated =
    records.length > 0 && dayjs().isAfter(dayjs(records[0].date));
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressItem = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissItem = () => {
    resetRecord();
  };
  return (
    <View className='flex-1 p-2'>
      {isUpdated ? (
        <View className='flex-1'>
          <FlashList
            data={records}
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
          <EmptyRecordList />
        </View>
      )}
      <StatusBar style='light' />
    </View>
  );
}
