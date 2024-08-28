import { useRef } from 'react';
import { View, Text, Pressable, Keyboard } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { BookType } from 'api/types';
import { useBookStore } from 'core/stateHooks';
import SelectAssetBottomSheet from 'components/BottomSheet/SelectAssetBottomSheet';

type TargetType = 'from_asset' | 'to_asset';

export default function Transfer() {
  const { control, getValues, setValue, reset } = useFormContext();
  const { getCurrentBook } = useBookStore();
  const fromAssetModalRef = useRef<BottomSheetModal>(null);
  const toAssetModalRef = useRef<BottomSheetModal>(null);

  const handlePressSelect = (value: TargetType) => {
    if (value === 'from_asset') {
      fromAssetModalRef.current?.present();
    } else if (value === 'to_asset') {
      toAssetModalRef.current?.present();
    }
    Keyboard.dismiss();
    if (!getValues(value)) {
      const flatAssets = (getCurrentBook() as BookType).groups.flatMap(
        (group) => group.assets
      );
      if (flatAssets.length > 0) {
        const defaultAsset = flatAssets[0];
        setValue(value, `${defaultAsset.id}-${defaultAsset.name}`);
      }
    }
  };

  return (
    <View className='items-center justify-center flex-1 gap-4'>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='items-center justify-center px-3 bg-gray-100 rounded-lg'
            onPress={() => handlePressSelect('from_asset')}
          >
            <Text className='text-lg '>
              {value ? value.split('-')[1] : 'no account'}
            </Text>
            <SelectAssetBottomSheet
              value={value}
              bottomSheetModalRef={fromAssetModalRef}
              onChange={onChange}
            />
          </Pressable>
        )}
        name='from_asset'
      />
      <View className='p-4 rotate-90 rounded-full bg-amber-300'>
        <FontAwesome name='exchange' size={24} color='black' />
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='items-center justify-center px-3 bg-gray-100 rounded-lg'
            onPress={() => handlePressSelect('to_asset')}
          >
            <Text className='text-lg '>
              {value ? value.split('-')[1] : 'no account'}
            </Text>
            <SelectAssetBottomSheet
              value={value}
              bottomSheetModalRef={toAssetModalRef}
              onChange={onChange}
            />
          </Pressable>
        )}
        name='to_asset'
      />
    </View>
  );
}
