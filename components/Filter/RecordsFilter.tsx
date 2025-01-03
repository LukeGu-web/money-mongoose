import { View, Text, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useGetFlatAssets } from 'api/asset';
import { RecordTypes } from 'api/record/types';
import { useBookStore } from 'core/stateHooks';
import Switch from '../Switch/Switch';

export type FilterType = {
  date_after?: Date;
  date_before?: Date;
  type: string;
  asset?: number;
  is_marked_tax_return: boolean;
};

export const defaultFilter: FilterType = {
  type: '',
  is_marked_tax_return: false,
};

const transaction = {
  All: '',
  Expense: RecordTypes.EXPENSE as string,
  Income: RecordTypes.INCOME as string,
  Transfer: RecordTypes.TRANSFER as string,
};

type FilterContentProps = {
  filter: FilterType;
  onSetFilter: (value: string) => void;
  onCloseFilter: (value: boolean, filterData: FilterType) => void;
};

export default function RecordsFilter({
  filter,
  onSetFilter,
  onCloseFilter,
}: FilterContentProps) {
  const currentBook = useBookStore((state) => state.currentBook);
  const { data, isPending, isError } = useGetFlatAssets({
    variables: { book_id: currentBook.id },
  });
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: filter,
  });

  const handleResetFilter = () => {
    reset();
    onCloseFilter(false, defaultFilter);
    setTimeout(() => {
      onSetFilter('');
    }, 300);
  };

  const handleSubmitData = handleSubmit((data) => {
    let extra = '';
    for (const [key, value] of Object.entries(data)) {
      if (Boolean(value)) {
        if (key.includes('date_')) {
          extra += `&${key}=${dayjs(value as Date).format('YYYY-MM-DD')}`;
        } else {
          extra += `&${key}=${value}`;
        }
      }
    }
    if (Boolean(extra)) onCloseFilter(true, data);
    setTimeout(() => {
      onSetFilter(extra);
    }, 300);
  });

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
                  <View className='rounded-lg w-28'>
                    <DateTimePicker
                      value={value}
                      display='default'
                      themeVariant='dark'
                      onChange={(e: any, selectedDate: any) => {
                        setValue('date_after', selectedDate);
                      }}
                    />
                  </View>
                ) : (
                  <Pressable
                    className='px-3 py-2 rounded-xl'
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    onPress={() => setValue('date_after', new Date())}
                  >
                    <Text className='color-white'>Start Date</Text>
                  </Pressable>
                )}
              </View>
            )}
            name='date_after'
          />
          <Text className='color-white'>To</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='rounded-lg w-28'>
                {!!value ? (
                  <DateTimePicker
                    value={value}
                    display='compact'
                    themeVariant='dark'
                    onChange={(e: any, selectedDate: any) => {
                      setValue('date_before', selectedDate);
                    }}
                  />
                ) : (
                  <Pressable
                    className='px-3 py-2 rounded-xl'
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    onPress={() => setValue('date_before', new Date())}
                  >
                    <Text className='color-white'>End Date</Text>
                  </Pressable>
                )}
              </View>
            )}
            name='date_before'
          />
        </View>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='gap-2'>
            <Text className='text-lg font-semibold color-white'>
              Transaction Type
            </Text>
            <View className='flex-row gap-2'>
              {Object.keys(transaction).map((item) => (
                <Pressable
                  key={item}
                  className={`items-center justify-center px-3 ${
                    value === transaction[item as keyof typeof transaction]
                      ? 'bg-amber-400'
                      : 'bg-gray-100'
                  } rounded-lg`}
                  onPress={() => {
                    setValue(
                      'type',
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
        name='type'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='gap-2'>
            <Text className='text-lg font-semibold color-white'>Account</Text>
            <View className='flex-row gap-2'>
              {data?.map((item) => (
                <Pressable
                  key={item.id}
                  className={`items-center justify-center px-3  rounded-lg ${
                    value === item.id ? 'bg-amber-400' : 'bg-gray-100'
                  }`}
                  onPress={() => setValue('asset', item.id)}
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
              Only show tax return items
            </Text>
            <Switch onValueChange={(e) => onChange(e)} value={value} />
          </View>
        )}
        name='is_marked_tax_return'
      />
      <View className='flex-row justify-between gap-6 mt-2'>
        <Pressable
          className='flex-1 p-2 bg-yellow-500 rounded-full'
          onPress={handleResetFilter}
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
