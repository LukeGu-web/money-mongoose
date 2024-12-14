import { useRef, useCallback } from 'react';
import { Text, View, Pressable, Keyboard } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useGetFlatAssets } from 'api/asset';
import { RecordTypes } from 'api/record/types';
import { removeIdAndDash } from 'core/utils';
import { useBookStore, useSettingStore } from 'core/stateHooks';
import SelectAssetBottomSheet from 'components/BottomSheet/SelectAssetBottomSheet';

export default function RecordToolbar() {
  const { control, getValues, setValue, reset } = useFormContext();
  const currentBook = useBookStore((state) => state.currentBook);
  const theme = useSettingStore((state) => state.theme);
  const { data, isPending, isError } = useGetFlatAssets({
    variables: { book_id: currentBook.id },
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
    console.log('handlePressSelect: ', data);
    if (!getValues('asset') && data && data.length > 0) {
      console.log('inside', data);
      const defaultAsset = data[0];
      setValue('asset', `${defaultAsset.id}-${defaultAsset.name}`);
    }
  }, [data]);

  console.log("getValues('asset') ", getValues('asset'));

  return (
    <View className='flex-row justify-start gap-2 px-5 py-2 mb-2 border-b-2 h-14 border-gray-50'>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <DateTimePicker
            key={theme}
            style={{ width: 90 }}
            value={value}
            display='compact'
            themeVariant={theme}
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
              className='items-center justify-center px-3 bg-gray-100 rounded-lg dark:bg-zinc-800'
              onPress={handlePressSelect}
            >
              <Text className='text-lg dark:color-white'>
                {value ? removeIdAndDash(value) : 'no account'}
              </Text>
              <SelectAssetBottomSheet
                data={data}
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
