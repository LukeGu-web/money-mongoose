import { useRef, useCallback } from 'react';
import { Text, View, Pressable, Keyboard } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useGetFlatAssets } from 'api/asset';
import { RecordTypes } from 'api/record/types';
import { useBookStore } from 'core/stateHooks';
import SelectAssetBottomSheet from 'components/BottomSheet/SelectAssetBottomSheet';

export default function RecordToolbar() {
  const { control, getValues, setValue, reset } = useFormContext();
  const currentBook = useBookStore((state) => state.currentBook);
  const { data, isPending, isError } = useGetFlatAssets({
    variables: { book_id: currentBook.id },
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
    if (!getValues('asset') && data && data.length > 0) {
      const defaultAsset = data[0];
      setValue('asset', `${defaultAsset.id}-${defaultAsset.name}`);
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
