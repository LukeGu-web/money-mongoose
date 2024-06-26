import { StyleSheet, Text, View } from 'react-native';
import { DateData } from 'react-native-calendars';

type CalendarDayType = {
  date: (string & DateData) | undefined;
  state: 'selected' | 'disabled' | 'inactive' | 'today' | '' | undefined;
  income?: number;
  expense?: number;
};

export default function CalendarDay({ date, state }: CalendarDayType) {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          color: state === 'disabled' ? 'gray' : 'black',
        }}
      >
        {date?.day}
      </Text>
      <Text>income</Text>
      <Text>expense</Text>
    </View>
  );
}
