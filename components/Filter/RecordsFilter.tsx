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
  Expense: RecordTypes.EXPENSE,
  Income: RecordTypes.INCOME,
  Transfer: RecordTypes.TRANSFER,
};

export default function RecordsFilter() {
  const { getCurrentBook } = useBookStore();
  const { setRecord } = useRecord();
  const flatAssets = (getCurrentBook() as BookType).groups.flatMap(
    (group) => group.assets
  );
  const { control, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      start_date: null,
      end_date: new Date(),
      transaction: 'all',
      asset: null,
      is_marked_tax_return: false,
    },
  });
  const [showStartDate, setShowStartDate] = useState(false);
  return (
    <View className='flex-1 gap-3 p-2'>
      <View className='gap-2 -mt-2'>
        <Text className='text-lg font-semibold'>Date Range</Text>
        <View className='flex-row items-center justify-between'>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                {!!value ? (
                  <DateTimePicker
                    value={value}
                    display='compact'
                    onChange={(e: any, selectedDate: any) => {
                      setValue('start_date', selectedDate);
                    }}
                  />
                ) : (
                  <Text>Start Date</Text>
                )}
              </View>
            )}
            name='start_date'
          />
          <Text>To</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <DateTimePicker
                value={value}
                display='compact'
                onChange={(e: any, selectedDate: any) => {
                  setValue('end_date', selectedDate);
                }}
              />
            )}
            name='end_date'
          />
        </View>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='gap-2'>
            <Text className='text-lg font-semibold'>Transaction</Text>
            <View className='flex-row gap-2'>
              {Object.keys(transaction).map((item) => (
                <Pressable
                  key={item}
                  className='items-center justify-center px-3 bg-gray-100 rounded-lg'
                  //   onPress={handlePressSelect}
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
            <Text className='text-lg font-semibold'>Account</Text>
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
            <Text className='text-lg font-semibold'>Only show taxed items</Text>
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
      <View className='flex-row justify-between gap-6'>
        <Pressable className='flex-1 p-2 bg-yellow-500 rounded-full '>
          <Text className='text-center color-white'>Reset</Text>
        </Pressable>
        <Pressable className='flex-1 p-2 rounded-full bg-amber-300'>
          <Text className='text-center color-slate-800'>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}
