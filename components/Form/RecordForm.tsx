import React, { useCallback, useRef } from 'react';
import { Text, View, Pressable, TextInput, Keyboard } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useGetFlatAssets } from 'api/asset';
import { removeIdAndDash } from 'core/utils';
import { useBookStore } from 'core/stateHooks';

import RecordCategoryBottomSheet from '../BottomSheet/RecordCategoryBottomSheet';
import SelectAssetBottomSheet from '../BottomSheet/SelectAssetBottomSheet';
import Icon from '../Icon/Icon';
import Switch from '../Switch/Switch';

export default function RecordForm() {
  const { control, setValue, getValues } = useFormContext();
  const amountRef = useRef<TextInput>(null);
  const assetBottomSheetRef = useRef<BottomSheetModal>(null);
  const categoryBottomSheetRef = useRef<BottomSheetModal>(null);

  const currentBook = useBookStore((state) => state.currentBook);
  const { data, isPending, isError } = useGetFlatAssets({
    variables: { book_id: currentBook.id },
  });

  const handleSelectCategory = useCallback(() => {
    categoryBottomSheetRef.current?.present();
  }, []);
  const handleSelectAsset = useCallback(() => {
    assetBottomSheetRef.current?.present();
    Keyboard.dismiss();
    if (!getValues('asset') && data && data.length > 0) {
      const defaultAsset = data[0];
      setValue('asset', `${defaultAsset.id}-${defaultAsset.name}`);
    }
  }, [data]);
  return (
    <View className='p-2 mb-12 bg-gray-200 rounded-lg'>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='flex-row items-center justify-between w-full h-12'>
            <Text>Type</Text>
            <View className='flex-row items-center border-2 border-white rounded-lg'>
              {['expense', 'income'].map((item, index) => (
                <Pressable
                  key={item}
                  className={`items-center justify-center py-1 px-2 border-white ${
                    index < 1 && 'border-r-2'
                  } ${getValues('type') === item && 'bg-white'}`}
                  onPress={() => {
                    setValue('type', item);
                  }}
                >
                  <Text
                    className={`text-center font-medium ${
                      getValues('type') === item
                        ? 'color-black'
                        : 'color-zinc-400'
                    }`}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
        name='type'
      />
      <Pressable
        className='flex-row items-center justify-between w-full h-12'
        onPress={handleSelectCategory}
      >
        <Text>Category</Text>
        {getValues('category') ? (
          <Text>
            {getValues('category')}
            {getValues('subcategory') && ` - ${getValues('subcategory')}`}
          </Text>
        ) : (
          <View className='flex-row items-center gap-1'>
            <Text className='color-zinc-400'>Select category</Text>
            <Icon name='arrow-right' size={14} color='#bfc0c0' />
          </View>
        )}
        <RecordCategoryBottomSheet
          bottomSheetModalRef={categoryBottomSheetRef}
        />
      </Pressable>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={() => amountRef.current?.focus()}
          >
            <Text>Amount</Text>
            <TextInput
              ref={amountRef}
              keyboardType='numeric'
              placeholder='Enter the amount'
              placeholderTextColor='#a1a1aa'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </Pressable>
        )}
        name='amount'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={handleSelectAsset}
          >
            <Text>Account</Text>
            <Text className='text-lg dark:color-white'>
              {value ? removeIdAndDash(value) : 'no account'}
            </Text>
            <SelectAssetBottomSheet
              data={data}
              value={value}
              bottomSheetModalRef={assetBottomSheetRef}
              onChange={onChange}
            />
          </Pressable>
        )}
        name='asset'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={handleSelectAsset}
          >
            <Text>Tax Return</Text>
            <Switch onValueChange={(e) => onChange(e)} value={value} />
          </Pressable>
        )}
        name='is_marked_tax_return'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='gap-2'>
            <Text>Note</Text>
            <TextInput
              className='items-start p-2 border-2 border-gray-400 rounded-lg'
              style={{ minHeight: 120 }}
              multiline={true}
              numberOfLines={4}
              placeholder='Enter a note'
              placeholderTextColor='#a1a1aa'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name='note'
      />
    </View>
  );
}
