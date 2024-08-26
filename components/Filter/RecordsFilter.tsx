import { useState, useCallback } from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RecordTypes } from 'api/record/types';
import { useRecord, useBookStore } from 'core/stateHooks';
import { AssetType, BookType } from 'api/types';

const transaction = {
  All: '',
  Expense: RecordTypes.EXPENSE as string,
  Income: RecordTypes.INCOME as string,
  Transfer: RecordTypes.TRANSFER as string,
};

type FilterType = {
  start_date?: Date;
  end_date?: Date;
  transaction: string;
  asset?: number;
  is_marked_tax_return: boolean;
};

const defaultFilter: FilterType = {
  // start_date: undefined,
  // end_date: new Date(),
  transaction: '',
  // asset: null,
  is_marked_tax_return: false,
};

export default function RecordsFilter() {
  const { getCurrentBook } = useBookStore();
  const { setRecord } = useRecord();
  const flatAssets = (getCurrentBook() as BookType).groups.flatMap(
    (group) => group.assets
  );
  const { control, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: defaultFilter,
  });

  const handleSubmitData = handleSubmit((data) => {
    console.log(data);
  });

  // const handleReset

  return (
    <View className='flex-1 gap-3 p-4 mb-4 border-2 border-white rounded-lg'>
      <View className='gap-2 -mt-2'>
        <Text className='text-lg font-semibold color-white'>Date Range</Text>
        <View className='flex-row items-center gap-4'>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                {!!value ? (
                  <View className='w-24 rounded-lg'>
                    <DateTimePicker
                      value={value}
                      display='default'
                      themeVariant='dark'
                      onChange={(e: any, selectedDate: any) => {
                        setValue('start_date', selectedDate);
                      }}
                    />
                  </View>
                ) : (
                  <Pressable
                    className='px-3 py-2 rounded-xl'
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    onPress={() => setValue('start_date', new Date())}
                  >
                    <Text className='color-white'>Start Date</Text>
                  </Pressable>
                )}
              </View>
            )}
            name='start_date'
          />
          <Text className='color-white'>To</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='w-24 rounded-lg'>
                {!!value ? (
                  <DateTimePicker
                    value={value}
                    display='compact'
                    themeVariant='dark'
                    onChange={(e: any, selectedDate: any) => {
                      setValue('end_date', selectedDate);
                    }}
                  />
                ) : (
                  <Pressable
                    className='px-3 py-2 rounded-xl'
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    onPress={() => setValue('end_date', new Date())}
                  >
                    <Text className='color-white'>End Date</Text>
                  </Pressable>
                )}
              </View>
            )}
            name='end_date'
          />
        </View>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='gap-2'>
            <Text className='text-lg font-semibold color-white'>
              Transaction
            </Text>
            <View className='flex-row gap-2'>
              {Object.keys(transaction).map((item) => (
                <Pressable
                  key={item}
                  className={`items-center justify-center px-3 ${
                    getValues('transaction') ===
                    transaction[item as keyof typeof transaction]
                      ? 'bg-amber-400'
                      : 'bg-gray-100'
                  } rounded-lg`}
                  onPress={() => {
                    setValue(
                      'transaction',
                      transaction[item as keyof typeof transaction]
                    );
                  }}
                >
                  <Text className='text-lg '>{item}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
        name='transaction'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='gap-2'>
            <Text className='text-lg font-semibold color-white'>Account</Text>
            <View className='flex-row gap-2'>
              {flatAssets.map((item) => (
                <Pressable
                  key={item.id}
                  className='items-center justify-center px-3 bg-gray-100 rounded-lg'
                  //   onPress={handlePressSelect}
                >
                  <Text className='text-lg '>{item.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
        name='asset'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='gap-2'>
            <Text className='text-lg font-semibold color-white'>
              Only show taxed items
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              ios_backgroundColor='#767577'
              onValueChange={(e) => {
                onChange(e);
              }}
              value={value}
            />
          </View>
        )}
        name='is_marked_tax_return'
      />
      <View className='flex-row justify-between gap-6 mt-2'>
        <Pressable
          className='flex-1 p-2 bg-yellow-500 rounded-full'
          onPress={() => reset()}
        >
          <Text className='text-center color-white'>Reset</Text>
        </Pressable>
        <Pressable
          className='flex-1 p-2 rounded-full bg-amber-300'
          onPress={handleSubmitData}
        >
          <Text className='text-center color-slate-800'>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}
