import { Text, View, Pressable } from 'react-native';
import { DateData } from 'react-native-calendars';
import { RecordsByDay } from 'api/record/types';
import Skeleton from '../Skeleton/Skeleton';

type CalendarDayType = {
  isLoading?: boolean;
  date: (string & DateData) | undefined;
  state: 'selected' | 'disabled' | 'inactive' | 'today' | '' | undefined;
  recordData?: RecordsByDay;
  selectedDate: string;
  onSelectDay: (day: string, records: RecordsByDay) => void;
};

export default function CalendarDay({
  isLoading = false,
  date,
  state,
  recordData,
  selectedDate,
  onSelectDay,
}: CalendarDayType) {
  return (
    <Pressable
      onPress={() =>
        onSelectDay(date?.dateString as string, recordData as RecordsByDay)
      }
      className='items-center'
    >
      <View
        className={`items-center justify-center text-center rounded-full w-7 h-7 ${
          state === 'today'
            ? 'bg-sky-300'
            : date?.dateString === selectedDate
            ? 'bg-amber-300'
            : 'bg-transparent'
        }`}
      >
        <Text
          className={`text-center ${
            state === 'disabled' ? 'color-gray-400' : 'color-black'
          }`}
        >
          {date?.day}
        </Text>
      </View>

      {isLoading ? (
        <View className='gap-2'>
          <Skeleton className='rounded-sm bg-zinc-300' height={6} width={20} />
          <Skeleton className='rounded-sm bg-zinc-300' height={6} width={20} />
        </View>
      ) : (
        <View>
          <Text className='text-xs text-center color-green-600'>
            {Math.abs(recordData?.sum_of_income as number) > 0 &&
              '+' + recordData?.sum_of_income}
          </Text>
          <Text className='text-xs text-center color-red-600'>
            {Math.abs(recordData?.sum_of_expense as number) > 0 &&
              recordData?.sum_of_expense}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
