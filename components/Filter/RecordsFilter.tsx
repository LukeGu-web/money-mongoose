import { useState, useCallback } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
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
      <View className='gap-2'>
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
                <TouchableOpacity
                  key={item}
                  className='items-center justify-center px-3 bg-gray-100 rounded-lg'
                  //   onPress={handlePressSelect}
                >
                  <Text className='text-lg '>{item}</Text>
                </TouchableOpacity>
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
                <TouchableOpacity
                  key={item.id}
                  className='items-center justify-center px-3 bg-gray-100 rounded-lg'
                  //   onPress={handlePressSelect}
                >
                  <Text className='text-lg '>{item.name}</Text>
                </TouchableOpacity>
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
              ios_backgroundColor='#3e3e3e'
              onValueChange={(e) => {
                onChange(e);
              }}
              value={value}
            />
          </View>
        )}
        name='is_marked_tax_return'
      />
    </View>
  );
}
