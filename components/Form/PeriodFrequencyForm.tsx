import React, { useCallback, useRef } from 'react';
import { Text, View, Pressable } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import RecordFrequencyBottomSheet from '../BottomSheet/RecordFrequencyBottomSheet';
import Icon from '../Icon/Icon';
import monthdays from 'static/monthdays.json';
import weekdays from 'static/weekdays.json';

export default function PeriodFrequencyForm() {
  const { control, setValue, getValues, watch } = useFormContext();
  watch(['month_day', 'week_days', 'num_of_days']);

  const frequencyBottomSheetRef = useRef<BottomSheetModal>(null);
  const handleSelectFrequency = useCallback(() => {
    frequencyBottomSheetRef.current?.present();
    setValue('frequency', 'daily');
  }, []);

  const frequencyText = () => {
    switch (getValues('frequency')) {
      case 'daily':
        return `Every ${
          Number(getValues('num_of_days')) > 1
            ? getValues('num_of_days') + ' days'
            : 'day'
        }`;
      case 'weekly':
        return `Every ${
          getValues('week_days')
            ? weekdays[getValues('week_days')?.[0] as number]
            : ''
        }`;
      case 'monthly':
        return `${
          getValues('month_day')
            ? monthdays[(getValues('month_day')! - 1) as number]
            : ''
        } of each month`;
      default:
        return getValues('frequency');
    }
  };

  return (
    <View className='p-2 bg-gray-200 rounded-lg'>
      <Pressable
        className='flex-row items-center justify-between w-full h-12'
        onPress={handleSelectFrequency}
      >
        <Text>Frequency</Text>
        <View>
          {getValues('frequency') ? (
            <Text>{frequencyText()}</Text>
          ) : (
            <View className='flex-row items-center gap-1'>
              <Text className='color-zinc-400'>Select frequency</Text>
              <Icon name='arrow-right' size={14} color='#bfc0c0' />
            </View>
          )}
          <RecordFrequencyBottomSheet
            bottomSheetModalRef={frequencyBottomSheetRef}
          />
        </View>
      </Pressable>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={() => setValue('start_date', new Date())}
          >
            <Text>Start Date</Text>
            <View>
              {!!value ? (
                <View className='rounded-lg w-28'>
                  <DateTimePicker
                    value={value}
                    display='default'
                    themeVariant='light'
                    onChange={(e: any, selectedDate: any) => {
                      setValue('start_date', selectedDate);
                    }}
                  />
                </View>
              ) : (
                <View className='flex-row items-center gap-1'>
                  <Text className='color-zinc-400'>Select Date</Text>
                  <Icon name='arrow-right' size={14} color='#bfc0c0' />
                </View>
              )}
            </View>
          </Pressable>
        )}
        name='start_date'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={() => setValue('end_date', new Date())}
          >
            <Text>End Date</Text>
            <View>
              {!!value ? (
                <View className='rounded-lg w-28'>
                  <DateTimePicker
                    value={value}
                    display='default'
                    themeVariant='light'
                    onChange={(e: any, selectedDate: any) => {
                      setValue('end_date', selectedDate);
                    }}
                  />
                </View>
              ) : (
                <View className='flex-row items-center gap-1'>
                  <Text className='color-zinc-400'>
                    leave blank for no expire
                  </Text>
                  <Icon name='arrow-right' size={14} color='#bfc0c0' />
                </View>
              )}
            </View>
          </Pressable>
        )}
        name='end_date'
      />
    </View>
  );
}
