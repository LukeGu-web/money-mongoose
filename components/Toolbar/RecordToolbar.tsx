import { useRef, useCallback } from 'react';
import { Text, View, Pressable, Keyboard } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BookType } from 'api/types';
import { RecordTypes } from 'api/record/types';
import { useBookStore } from 'core/stateHooks';
import SelectAssetBottomSheet from 'components/BottomSheet/SelectAssetBottomSheet';

export default function RecordToolbar() {
  const { control, getValues, setValue, reset } = useFormContext();
  const { getCurrentBook } = useBookStore();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
    if (!getValues('asset')) {
      const flatAssets = (getCurrentBook() as BookType).groups.flatMap(
        (group) => group.assets
      );
      if (flatAssets.length > 0) {
        const defaultAsset = flatAssets[0];
        setValue('asset', `${defaultAsset.id}-${defaultAsset.name}`);
      }
    }
  }, []);

  return (
    <View className='flex-row justify-start gap-2 px-5 py-2 mb-2 border-b-2 h-14 border-gray-50'>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <DateTimePicker
            style={{ width: 90 }}
            value={value}
            display='compact'
            // themeVariant='dark'
            onChange={(e: any, selectedDate: any) => {
              setValue('date', selectedDate);
            }}
          />
        )}
        name='date'
      />
      {getValues('type') !== RecordTypes.TRANSFER && (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Pressable
              className='items-center justify-center px-3 bg-gray-100 rounded-lg'
              onPress={handlePressSelect}
            >
              <Text className='text-lg '>
                {value ? value.split('-')[1] : 'no account'}
              </Text>
              <SelectAssetBottomSheet
                value={value}
                bottomSheetModalRef={bottomSheetModalRef}
                onChange={onChange}
              />
            </Pressable>
          )}
          name='asset'
        />
      )}
    </View>
  );
}
