import React, { useState, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';
import { useShallow } from 'zustand/react/shallow';
import BottomSheet from './BottomSheet';
import { useSettingStore } from 'core/stateHooks';
import {
  frequencyOptions,
  frequencyContent,
  weekdays,
  monthdays,
} from 'static/period-record-content';

type RecordFrequencyBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function RecordFrequencyBottomSheet({
  bottomSheetModalRef,
}: RecordFrequencyBottomSheetProps) {
  const { theme } = useSettingStore(
    useShallow((state) => ({
      theme: state.theme,
    }))
  );
  const { control, getValues, setValue, watch, resetField } = useFormContext();
  watch(['frequency']);
  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={300}>
      <View className='items-center flex-1 w-full gap-2 p-2'>
        <Text className='text-xl font-semibold dark:color-white'>
          Select Frequency
        </Text>
        <View className='flex-row justify-start flex-1 w-full '>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <PickerIOS
                selectedValue={getValues('frequency')}
                onValueChange={(itemValue: string | number) => {
                  setValue('frequency', itemValue);
                  if (getValues('frequency') !== 'weekly')
                    resetField('week_days');
                  if (getValues('frequency') !== 'monthly')
                    resetField('month_day');
                }}
                style={{ width: '30%' }}
                itemStyle={{
                  color: theme === 'dark' ? 'white' : 'black',
                  fontSize: 12,
                }}
              >
                {frequencyOptions.map((item, index) => (
                  <PickerIOS.Item key={item} label={item} value={item} />
                ))}
              </PickerIOS>
            )}
            name='frequency'
          />

          <View className='w-2/3 gap-2 rounded-lg bg-zinc-100'>
            <View className='p-2 bg-yellow-200 rounded-t-lg'>
              <Text className='text-sm'>
                {
                  frequencyContent[
                    getValues('frequency') as keyof typeof frequencyContent
                  ]
                }
              </Text>
            </View>
            {getValues('frequency') === 'weekly' && (
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className='flex-row flex-wrap justify-start gap-4 p-2'>
                    {weekdays.map((day, index) => (
                      <Pressable
                        key={day}
                        className={`py-2 w-12 border-2 rounded-lg border-amber-400 ${
                          getValues('week_days') &&
                          index === getValues('week_days')[0] &&
                          'bg-amber-300'
                        }`}
                        onPress={() => {
                          setValue('week_days', [index]);
                        }}
                      >
                        <Text className='self-center'>{day}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
                name='week_days'
              />
            )}
            {getValues('frequency') === 'monthly' && (
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className='flex-row flex-wrap justify-start gap-2 pt-2 pl-3'>
                    {monthdays.map((day) => (
                      <Pressable
                        key={`month-day-${day}`}
                        className={`h-7 w-7 border-2 rounded-full items-center justify-center border-amber-400 ${
                          day === getValues('month_day') && 'bg-amber-300'
                        }`}
                        onPress={() => {
                          setValue('month_day', day);
                        }}
                      >
                        <Text>{day}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
                name='month_day'
              />
            )}
          </View>
        </View>
      </View>
    </BottomSheet>
  );
}
