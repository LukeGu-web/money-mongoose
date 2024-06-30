import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useStyles, TColors } from 'core/theme';
import { useRecordStore } from 'core/stateHooks';

export default function ExpenseCard() {
  const { theme, styles } = useStyles(createStyles);
  const records = useRecordStore((state) => state.records);

  const currentMonth = dayjs().month();
  let n = 0,
    monthIncome = 0,
    monthExpense = 0;
  while (
    dayjs(records[n]?.date).month() === currentMonth &&
    records.length > n
  ) {
    monthIncome += records[n].sum_of_income;
    monthExpense += records[n].sum_of_expense;
    n++;
  }
  const month = dayjs().format('MMMM');

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>
        {month}
        <Text style={{ fontSize: 16 }}>&#183; Expense</Text>
      </Text>
      <Text style={{ fontSize: 32 }}>{monthExpense.toLocaleString()}</Text>
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: '800' }}>Income</Text>
        <Text>{monthIncome}</Text>
        <Text style={{ fontWeight: '800' }}>Balance</Text>
        <Text>{monthIncome + monthExpense}</Text>
      </View>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 8,
    },
    textContainer: {
      gap: 5,
      flexDirection: 'row',
    },
  });
