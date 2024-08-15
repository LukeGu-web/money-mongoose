import { useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import Icon from '../Icon/Icon';
import { inputAccessoryCreateBtnID } from './static';
import PickerBottomSheet from 'components/BottomSheet/PickerBottomSheet';
import monthlyDay from 'static/monthly-day.json';

export default function AssetCreditForm() {
  const { control } = useFormContext();
  const billDayRef = useRef<BottomSheetModal>(null);
  const repayDayRef = useRef<BottomSheetModal>(null);

  const handlePressBillDay = useCallback(() => {
    Keyboard.dismiss();
    billDayRef.current?.present();
  }, []);

  const handlePressRepayDay = useCallback(() => {
    Keyboard.dismiss();
    repayDayRef.current?.present();
  }, []);

  return (
    <View className='items-center justify-between flex-1 w-full p-4'>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='flex-row items-center justify-between w-full h-12'>
            <Text>Credit limit</Text>
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
        name='credit_limit'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='flex-row items-center justify-between w-full h-12'>
            <Text>Bill Day</Text>
            <View>
              <TouchableOpacity onPress={handlePressBillDay}>
                {value ? (
                  <Text>{value}</Text>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text style={{ color: '#bfc0c0' }}>Select the day</Text>
                    <Icon name='arrow-right' size={14} color='#bfc0c0' />
                  </View>
                )}
              </TouchableOpacity>
              <PickerBottomSheet
                key='billDay'
                bottomSheetModalRef={billDayRef}
                data={monthlyDay}
                value={value}
                onChange={onChange}
              />
            </View>
          </View>
        )}
        name='bill_day'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='flex-row items-center justify-between w-full h-12'>
            <Text>Repayment Day</Text>
            <View>
              <TouchableOpacity onPress={handlePressRepayDay}>
                {value ? (
                  <Text>{value}</Text>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text style={{ color: '#bfc0c0' }}>Select the day</Text>
                    <Icon name='arrow-right' size={14} color='#bfc0c0' />
                  </View>
                )}
              </TouchableOpacity>
              <PickerBottomSheet
                key='repaymentDay'
                bottomSheetModalRef={repayDayRef}
                data={monthlyDay}
                value={value}
                onChange={onChange}
              />
            </View>
          </View>
        )}
        name='repayment_day'
      />
    </View>
  );
}
