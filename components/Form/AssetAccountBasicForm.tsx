import { useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  Keyboard,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import Icon from '../Icon/Icon';
import { useBookStore } from 'core/stateHooks';
import SelectGroupBottomSheet from '../BottomSheet/SelectGroupBottomSheet';
import { inputAccessoryCreateBtnID } from './static';
import { BookType } from 'api/types';

export default function AssetAccountBasicForm() {
  const { control, setValue, getValues } = useFormContext();
  const { getCurrentBook } = useBookStore();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const nameRef = useRef<TextInput>(null);
  const balanceRef = useRef<TextInput>(null);

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
    if (!getValues('group')) {
      const defaultGroup = (getCurrentBook() as BookType).groups[0];
      setValue('group', `${defaultGroup.id}-${defaultGroup.name}`);
    }
  }, []);

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
                <Text>{value.split('-')[1]}</Text>
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
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              ios_backgroundColor='#f8f9fa'
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
