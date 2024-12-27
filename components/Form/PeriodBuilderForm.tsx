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

import { useGetFlatAssets } from 'api/asset';
import { removeIdAndDash } from 'core/utils';
import { useBookStore, useSettingStore } from 'core/stateHooks';
import RecordCategoryBottomSheet from '../BottomSheet/RecordCategoryBottomSheet';
import RecordFrequencyBottomSheet from '../BottomSheet/RecordFrequencyBottomSheet';
import SelectAssetBottomSheet from '../BottomSheet/SelectAssetBottomSheet';
import CreateButton from '../Buttons/CreateButton';
import Icon from '../Icon/Icon';
import monthdays from 'static/monthdays.json';
import weekdays from 'static/weekdays.json';

export type PeriodFormType = {
  frequency: string;
  month_day?: number;
  week_days?: number[];
  start_date: Date;
  end_date?: Date;
  type: string;
  category: string;
  subcategory?: string;
  amount: string;
  asset?: string;
  note?: string;
};

export default function PeriodBuilderForm() {
  const currentBook = useBookStore((state) => state.currentBook);
  const { data, isPending, isError } = useGetFlatAssets({
    variables: { book_id: currentBook.id },
  });
  const amountRef = useRef<TextInput>(null);
  const assetBottomSheetRef = useRef<BottomSheetModal>(null);
  const categoryBottomSheetRef = useRef<BottomSheetModal>(null);
  const frequencyBottomSheetRef = useRef<BottomSheetModal>(null);

  const defaultValues = {
    frequency: '',
    start_date: new Date(),
    end_date: undefined,
    type: 'expense',
    category: '',
    subcategory: '',
    amount: '',
  };
  const methods = useForm<PeriodFormType>({
    defaultValues: defaultValues,
    criteriaMode: 'all',
  });
  const { control, handleSubmit, setValue, getValues, watch } = methods;
  watch(['month_day', 'week_days']);

  const handleSelectCategory = useCallback(() => {
    categoryBottomSheetRef.current?.present();
  }, []);
  const handleSelectFrequency = useCallback(() => {
    frequencyBottomSheetRef.current?.present();
    setValue('frequency', 'daily');
  }, []);
  const handleSelectAsset = useCallback(() => {
    assetBottomSheetRef.current?.present();
    Keyboard.dismiss();
    if (!getValues('asset') && data && data.length > 0) {
      const defaultAsset = data[0];
      setValue('asset', `${defaultAsset.id}-${defaultAsset.name}`);
    }
  }, [data]);
  const handleFormSubmit = handleSubmit((data: any) =>
    console.log('Period build form: ', data)
  );
  return (
    <>
      <KeyboardAwareScrollView className='p-2'>
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
                          ? `Every ${
                              getValues('week_days')
                                ? weekdays[
                                    getValues('week_days')?.[0] as number
                                  ]
                                : ''
                            }`
                          : getValues('frequency') === 'monthly'
                          ? `${
                              getValues('month_day')
                                ? monthdays[
                                    (getValues('month_day')! - 1) as number
                                  ]
                                : ''
                            } of each month`
                          : getValues('frequency')}
                      </Text>
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
                      {getValues('subcategory') &&
                        ` - ${getValues('subcategory')}`}
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
