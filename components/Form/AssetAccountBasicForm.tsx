import { useCallback, useRef } from 'react';
import { View, Text, TextInput, Pressable, Keyboard } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useGetGroupedAssets } from 'api/asset';
import { removeIdAndDash } from 'core/utils';
import { useBookStore } from 'core/stateHooks';
import { inputAccessoryCreateBtnID } from './static';
import SelectGroupBottomSheet from '../BottomSheet/SelectGroupBottomSheet';
import Icon from '../Icon/Icon';
import Switch from '../Switch/Switch';

export default function AssetAccountBasicForm() {
  const { control, setValue, getValues } = useFormContext();
  const currentBook = useBookStore((state) => state.currentBook);
  const { data, isPending, isError } = useGetGroupedAssets({
    variables: { book_id: currentBook.id },
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const nameRef = useRef<TextInput>(null);
  const balanceRef = useRef<TextInput>(null);

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
    if (!getValues('group') && data && data.groups.length > 0) {
      const defaultGroup = data.groups[0];
      setValue('group', `${defaultGroup.id}-${defaultGroup.name}`);
    }
  }, [data]);

  return (
    <View className='items-center justify-between flex-1 w-full p-4'>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={() => nameRef.current?.focus()}
          >
            <Text>Account Name</Text>
            <TextInput
              inputAccessoryViewID={inputAccessoryCreateBtnID}
              ref={nameRef}
              placeholder='Enter the amount name'
              placeholderTextColor='#a1a1aa'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </Pressable>
        )}
        name='name'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={handlePressSelect}
          >
            <Text>Group</Text>
            <View>
              {value ? (
                <Text>{removeIdAndDash(value)}</Text>
              ) : (
                <View className='flex-row items-center gap-1'>
                  <Text className='color-zinc-400'>Select group</Text>
                  <Icon name='arrow-right' size={14} color='#bfc0c0' />
                </View>
              )}
              <SelectGroupBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                value={value}
                onChange={onChange}
              />
            </View>
          </Pressable>
        )}
        name='group'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={() => balanceRef.current?.focus()}
          >
            <Text>Balance</Text>
            <TextInput
              inputAccessoryViewID={inputAccessoryCreateBtnID}
              ref={balanceRef}
              placeholder='0.00'
              keyboardType='numeric'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </Pressable>
        )}
        name='balance'
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View className='flex-row items-center justify-between w-full h-12'>
            <Text>Credit</Text>
            <Switch
              onValueChange={(e) => {
                onChange(e);
                Keyboard.dismiss();
              }}
              value={value}
            />
          </View>
        )}
        name='is_credit'
      />
    </View>
  );
}
