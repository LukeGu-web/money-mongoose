import React, { useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';
import * as Haptics from 'expo-haptics';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { FrequencyTypes } from 'api/period/types';
import { useSettingStore } from 'core/stateHooks';
import {
  frequencyContent,
  weekdays,
  monthdays,
} from 'static/period-record-content';
import BottomSheet from './BottomSheet';

type RecordFrequencyBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function RecordFrequencyBottomSheet({
  bottomSheetModalRef,
}: RecordFrequencyBottomSheetProps) {
  const theme = useSettingStore((state) => state.theme);
  const { control, getValues, setValue, watch, resetField } = useFormContext();
  watch(['frequency']);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startContinuousCounter = (value: number, operator: string) => {
    intervalRef.current = setInterval(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      setValue('num_of_days', operator === 'plus' ? value++ : value--);
      if (value < 1 || value > 365) stopContinuousCounter();
    }, 100);
  };

  const stopContinuousCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
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
                  if (getValues('frequency') !== FrequencyTypes.WEEKLY)
                    resetField('week_days');
                  if (getValues('frequency') !== FrequencyTypes.MONTHLY)
                    resetField('month_day');
                }}
                style={{ width: '30%' }}
                itemStyle={{
                  color: theme === 'dark' ? 'white' : 'black',
                  fontSize: 12,
                }}
              >
                {Object.values(FrequencyTypes).map((item) => (
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
            {getValues('frequency') === FrequencyTypes.DAILY && (
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className='items-center justify-center h-40 gap-2'>
                    <View className='flex-row '>
                      <Pressable
                        className='items-center justify-center w-8 h-8 bg-gray-300 rounded-l-lg disabled:bg-gray-200'
                        disabled={value === 1}
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                          setValue('num_of_days', --value);
                        }}
                        onLongPress={() =>
                          startContinuousCounter(value, 'minus')
                        }
                        onPressOut={stopContinuousCounter}
                        delayLongPress={500}
                      >
                        <FontAwesome5
                          name='minus'
                          size={12}
                          color={value === 1 ? 'white' : 'black'}
                        />
                      </Pressable>
                      <View className='items-center justify-center w-20 bg-white border-gray-300 border-y-2'>
                        <Text>{getValues('num_of_days')}</Text>
                      </View>
                      <Pressable
                        className='items-center justify-center w-8 h-8 bg-gray-300 rounded-r-lg disabled:bg-gray-200'
                        disabled={value === 365}
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                          setValue('num_of_days', ++value);
                        }}
                        onLongPress={() =>
                          startContinuousCounter(value, 'plus')
                        }
                        onPressOut={stopContinuousCounter}
                        delayLongPress={500}
                      >
                        <FontAwesome5
                          name='plus'
                          size={12}
                          color={value === 365 ? 'white' : 'black'}
                        />
                      </Pressable>
                    </View>
                    <Text className='text-sm color-red-500'>
                      * Select from 1 to 365
                    </Text>
                  </View>
                )}
                name='num_of_days'
              />
            )}
            {getValues('frequency') === FrequencyTypes.WEEKLY && (
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
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
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
            {getValues('frequency') === FrequencyTypes.MONTHLY && (
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
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
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
