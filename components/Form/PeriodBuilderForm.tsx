import React, { useCallback, useRef } from 'react';
import {
  Text,
  View,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import RecordFrequencyBottomSheet from '../BottomSheet/RecordFrequencyBottomSheet';
import CreateButton from 'components/Buttons/CreateButton';
import Icon from '../Icon/Icon';

export type PeriodFormType = {
  frequency: string;
  month_day?: number;
  week_days?: number[];
  start_date: Date;
  end_date?: Date;
  type: string;
  category: string;
  amount: number;
  asset?: number;
};

export default function PeriodBuilderForm() {
  const defaultValues = {
    frequency: '',
    start_date: new Date(),
    end_date: undefined,
    type: '',
    category: '',
    amount: 0,
    asset: undefined,
  };
  const methods = useForm<PeriodFormType>({
    defaultValues: defaultValues,
    criteriaMode: 'all',
  });
  const { control, handleSubmit, setValue, getValues, watch } = methods;
  //   watch(['frequency']);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleSelectFrequency = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setValue('frequency', 'daily');
  }, []);
  const handleFormSubmit = handleSubmit((data: any) =>
    console.log('Period build form: ', data)
  );
  return (
    <>
      <KeyboardAwareScrollView className='p-2 '>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className='gap-3'>
            <FormProvider {...methods}>
              <View className='p-2 bg-gray-200 rounded-lg'>
                <Pressable
                  className='flex-row items-center justify-between w-full h-12'
                  onPress={handleSelectFrequency}
                >
                  <Text>Frequency</Text>
                  <View>
                    {getValues('frequency') ? (
                      <Text>
                        {getValues('frequency') === 'weekly'
                          ? `${getValues('week_days') ?? ''} of each week`
                          : getValues('frequency') === 'monthly'
                          ? `${getValues('month_day') ?? ''} of each month`
                          : getValues('frequency')}
                      </Text>
                    ) : (
                      <View className='flex-row items-center gap-1'>
                        <Text className='color-zinc-400'>Select frequency</Text>
                        <Icon name='arrow-right' size={14} color='#bfc0c0' />
                      </View>
                    )}
                    <RecordFrequencyBottomSheet
                      bottomSheetModalRef={bottomSheetModalRef}
                      // value={value}
                      // onChange={onChange}
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
                            <Icon
                              name='arrow-right'
                              size={14}
                              color='#bfc0c0'
                            />
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
                            <Icon
                              name='arrow-right'
                              size={14}
                              color='#bfc0c0'
                            />
                          </View>
                        )}
                      </View>
                    </Pressable>
                  )}
                  name='end_date'
                />
              </View>
              <View className='p-2 bg-gray-200 rounded-lg'>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Pressable
                      className='flex-row items-center justify-between w-full h-12'
                      // onPress={() => nameRef.current?.focus()}
                    >
                      <Text>Type</Text>
                      <TextInput
                        //   ref={nameRef}
                        placeholder='Enter the amount name'
                        placeholderTextColor='#a1a1aa'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Pressable>
                  )}
                  name='type'
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Pressable
                      className='flex-row items-center justify-between w-full h-12'
                      // onPress={() => nameRef.current?.focus()}
                    >
                      <Text>Category</Text>
                      <TextInput
                        //   ref={nameRef}
                        placeholder='Enter the amount name'
                        placeholderTextColor='#a1a1aa'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Pressable>
                  )}
                  name='category'
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Pressable
                      className='flex-row items-center justify-between w-full h-12'
                      // onPress={() => nameRef.current?.focus()}
                    >
                      <Text>Amount</Text>
                      <TextInput
                        //   ref={nameRef}
                        keyboardType='numeric'
                        placeholder='Enter the amount name'
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
                      // onPress={() => nameRef.current?.focus()}
                    >
                      <Text>Account</Text>
                      <TextInput
                        //   ref={nameRef}
                        placeholder='Enter the amount name'
                        placeholderTextColor='#a1a1aa'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Pressable>
                  )}
                  name='asset'
                />
              </View>
            </FormProvider>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <CreateButton
        targetId={-1}
        isPending={false}
        onPress={handleFormSubmit}
      />
    </>
  );
}
