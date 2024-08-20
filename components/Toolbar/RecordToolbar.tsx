import { useRef, useCallback } from 'react';
import { Text, View, TouchableOpacity, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useShallow } from 'zustand/react/shallow';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BookType } from 'api/types';
import { useAsset, useRecord, useBookStore } from 'core/stateHooks';
import SelectAssetBottomSheet from 'components/BottomSheet/SelectAssetBottomSheet';

export default function RecordToolbar() {
  const { getCurrentBook } = useBookStore();
  const { asset, setSelect } = useAsset();
  const { record, setRecord } = useRecord(
    useShallow((state) => ({
      record: state.record,
      setRecord: state.setRecord,
    }))
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onDateChange = (e: any, selectedDate: any) => {
    setRecord({ date: selectedDate });
  };

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
    if (asset.name === '') {
      const flatAssets = (getCurrentBook() as BookType).groups.flatMap(
        (group) => group.assets
      );
      if (flatAssets.length > 0) {
        const defaultAsset = flatAssets[0];
        setSelect(defaultAsset);
        setRecord({ asset: defaultAsset.id });
      }
    }
  }, []);

  return (
    <View className='flex-row justify-start gap-2 px-5 py-2 mb-2 border-b-2 h-14 border-gray-50'>
      <DateTimePicker
        style={{ width: 90 }}
        value={record.date as any}
        mode={'date'}
        display='calendar'
        onChange={onDateChange}
      />
      <TouchableOpacity
        className='items-center justify-center px-3 bg-gray-100 rounded-lg'
        onPress={handlePressSelect}
      >
        <Text className='text-lg '>
          {asset.name !== '' ? asset.name : 'no account'}
        </Text>
      </TouchableOpacity>
      <SelectAssetBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}
