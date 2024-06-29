import { RecordsByDay } from 'api/record/types';
import { useTheme } from 'core/theme';
import { StyleSheet, Text, View } from 'react-native';
import { DateData } from 'react-native-calendars';

type CalendarDayType = {
  date: (string & DateData) | undefined;
  state: 'selected' | 'disabled' | 'inactive' | 'today' | '' | undefined;
  recordData?: RecordsByDay;
};

export default function CalendarDay({
  date,
  state,
  recordData,
}: CalendarDayType) {
  const { theme } = useTheme();
  // console.log('CalendarDay date: ', date);
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          color: state === 'disabled' ? 'gray' : theme.textPrimary,
        }}
      >
        {date?.day}
      </Text>
      <Text>{recordData?.sum_of_income}</Text>
      <Text>{recordData?.sum_of_expense}</Text>
    </View>
  );
}
