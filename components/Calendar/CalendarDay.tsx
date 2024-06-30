import { StyleSheet, Text, View } from 'react-native';
import { RecordsByDay } from 'api/record/types';
import { DateData } from 'react-native-calendars';
import { useStyles, useTheme, TColors } from 'core/theme';

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
  const { theme, styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.day,
          {
            color: state === 'disabled' ? 'gray' : theme.textPrimary,
          },
        ]}
      >
        {date?.day}
      </Text>
      <Text style={styles.income}>
        {Math.abs(recordData?.sum_of_income as number) > 0 &&
          '+' + recordData?.sum_of_income}
      </Text>
      <Text style={styles.expense}>
        {Math.abs(recordData?.sum_of_expense as number) > 0 &&
          recordData?.sum_of_expense}
      </Text>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {},
    day: { textAlign: 'center' },
    income: {
      marginTop: 2,
      textAlign: 'center',
      color: theme.incomeTextColor,
      fontSize: 10,
    },
    expense: {
      textAlign: 'center',
      color: theme.expenseTextColor,
      fontSize: 10,
    },
  });
