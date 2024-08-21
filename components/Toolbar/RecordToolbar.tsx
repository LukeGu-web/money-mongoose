import { useRef, useCallback } from 'react';
import { Text, View, TouchableOpacity, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BookType } from 'api/types';
import { RecordTypes } from 'api/record/types';
import { useRecord, useBookStore } from 'core/stateHooks';
import SelectAssetBottomSheet from 'components/BottomSheet/SelectAssetBottomSheet';

export default function RecordToolbar() {
  const { getCurrentBook } = useBookStore();
  const { record, setRecord } = useRecord();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onDateChange = (e: any, selectedDate: any) => {
    setRecord({ date: selectedDate });
  };

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
    if (!record.asset) {
      const flatAssets = (getCurrentBook() as BookType).groups.flatMap(
        (group) => group.assets
      );
      if (flatAssets.length > 0) {
        const defaultAsset = flatAssets[0];
        setRecord({ asset: `${defaultAsset.id}-${defaultAsset.name}` });
      }
    }
  }, []);

  return (
    <View className='flex-row justify-start gap-2 px-5 py-2 mb-2 border-b-2 h-14 border-gray-50'>
      <DateTimePicker
        style={{ width: 90 }}
        value={dayjs(record.date, 'YYYY-MM-DD').toDate()}
        mode={'date'}
        display='calendar'
        onChange={onDateChange}
      />
      {record.type !== RecordTypes.TRANSFER && (
        <TouchableOpacity
          className='items-center justify-center px-3 bg-gray-100 rounded-lg'
          onPress={handlePressSelect}
        >
          <Text className='text-lg '>
            {record.asset ? record.asset.split('-')[1] : 'no account'}
          </Text>
        </TouchableOpacity>
      )}
      <SelectAssetBottomSheet
        target='asset'
        value={record.asset}
        bottomSheetModalRef={bottomSheetModalRef}
      />
    </View>
  );
}
