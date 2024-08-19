import { Text, View, TouchableOpacity } from 'react-native';
import { DateData } from 'react-native-calendars';
import { RecordsByDay } from 'api/record/types';

type CalendarDayType = {
  date: (string & DateData) | undefined;
  state: 'selected' | 'disabled' | 'inactive' | 'today' | '' | undefined;
  recordData?: RecordsByDay;
  selectedDate: string;
  onSelectDay: (day: string, records: RecordsByDay) => void;
};

export default function CalendarDay({
  date,
  state,
  recordData,
  selectedDate,
  onSelectDay,
}: CalendarDayType) {
  return (
    <TouchableOpacity
      onPress={() =>
        onSelectDay(date?.dateString as string, recordData as RecordsByDay)
      }
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
      <Text className='text-xs text-center color-green-600'>
        {Math.abs(recordData?.sum_of_income as number) > 0 &&
          '+' + recordData?.sum_of_income}
      </Text>
      <Text className='text-xs text-center color-red-600'>
        {Math.abs(recordData?.sum_of_expense as number) > 0 &&
          recordData?.sum_of_expense}
      </Text>
    </TouchableOpacity>
  );
}
