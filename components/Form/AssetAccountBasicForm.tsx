import { useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
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
          <View className='flex-row items-center justify-between w-full h-12'>
            <Text>Account Name</Text>
            <TextInput
              inputAccessoryViewID={inputAccessoryCreateBtnID}
              placeholder='Enter the amount name'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name='name'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='flex-row items-center justify-between w-full h-12'>
            <Text>Group</Text>
            <View>
              <TouchableOpacity onPress={handlePressSelect}>
                {value ? (
                  <Text>{value.split('-')[1]}</Text>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text style={{ color: '#bfc0c0' }}>Select group</Text>
                    <Icon name='arrow-right' size={14} color='#bfc0c0' />
                  </View>
                )}
              </TouchableOpacity>
              <SelectGroupBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                value={value}
                onChange={onChange}
              />
            </View>
          </View>
        )}
        name='group'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='flex-row items-center justify-between w-full h-12'>
            <Text>Balance</Text>
            <TextInput
              inputAccessoryViewID={inputAccessoryCreateBtnID}
              placeholder='0.00'
              keyboardType='numeric'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
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
