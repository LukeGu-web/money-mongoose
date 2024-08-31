import { useCallback, useRef } from 'react';
import { View, Text, TextInput, Pressable, Keyboard } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import Icon from '../Icon/Icon';
import { inputAccessoryCreateBtnID } from './static';
import PickerBottomSheet from 'components/BottomSheet/PickerBottomSheet';
import monthlyDay from 'static/monthly-day.json';

export default function AssetCreditForm() {
  const { control, getValues, setValue } = useFormContext();
  const billDayRef = useRef<BottomSheetModal>(null);
  const repayDayRef = useRef<BottomSheetModal>(null);
  const creditRef = useRef<TextInput>(null);

  const handlePressBillDay = useCallback(() => {
    Keyboard.dismiss();
    billDayRef.current?.present();
    if (!getValues('bill_day')) {
      setValue('bill_day', 1);
    }
  }, []);

  const handlePressRepayDay = useCallback(() => {
    Keyboard.dismiss();
    repayDayRef.current?.present();
    if (!getValues('repayment_day')) {
      setValue('repayment_day', 1);
    }
  }, []);

  return (
    <View className='items-center justify-between flex-1 w-full p-4'>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={() => creditRef.current?.focus()}
          >
            <Text>Credit limit</Text>
            <TextInput
              inputAccessoryViewID={inputAccessoryCreateBtnID}
              ref={creditRef}
              placeholder='0.00'
              keyboardType='numeric'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </Pressable>
        )}
        name='credit_limit'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            onPress={handlePressBillDay}
            className='flex-row items-center justify-between w-full h-12'
          >
            <Text>Bill Day</Text>
            <View>
              {value ? (
                <Text>{monthlyDay[value - 1]}</Text>
              ) : (
                <View className='flex-row items-center gap-1'>
                  <Text className='color-zinc-400'>Select the day</Text>
                  <Icon name='arrow-right' size={14} color='#bfc0c0' />
                </View>
              )}
              <PickerBottomSheet
                key='billDay'
                bottomSheetModalRef={billDayRef}
                data={monthlyDay}
                value={value}
                onChange={onChange}
              />
            </View>
          </Pressable>
        )}
        name='bill_day'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            onPress={handlePressRepayDay}
            className='flex-row items-center justify-between w-full h-12'
          >
            <Text>Repayment Day</Text>
            <View>
              {value ? (
                <Text>{monthlyDay[value - 1]}</Text>
              ) : (
                <View className='flex-row items-center gap-1'>
                  <Text className='color-zinc-400'>Select the day</Text>
                  <Icon name='arrow-right' size={14} color='#bfc0c0' />
                </View>
              )}
              <PickerBottomSheet
                key='repaymentDay'
                bottomSheetModalRef={repayDayRef}
                data={monthlyDay}
                value={value}
                onChange={onChange}
              />
            </View>
          </Pressable>
        )}
        name='repayment_day'
      />
    </View>
  );
}
