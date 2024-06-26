import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useStyles, TColors } from 'core/theme';
import { useRecordStore } from 'core/stateHooks';

const formatter = (num: number) =>
  num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });

export default function ExpenseCard() {
  const { styles } = useStyles(createStyles);
  const records = useRecordStore((state) => state.records);

  console.log('records: ', records);
  const currentMonth = dayjs().month();
  let n = 0,
    monthIncome = 0,
    monthExpense = 0;
  while (
    dayjs(records[n]?.date).month() === currentMonth &&
    records.length > n
  ) {
    monthIncome += Number(records[n].sum_of_income);
    monthExpense += Number(records[n].sum_of_expense);
    n++;
  }
  const month = dayjs().format('MMMM');

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>
        {month}
        <Text style={{ fontSize: 16 }}>&#183; Expense</Text>
      </Text>
      <Text style={{ fontSize: 32 }}>{formatter(monthExpense)}</Text>
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: '800' }}>Income</Text>
        <Text>{formatter(monthIncome)}</Text>
        <Text style={{ fontWeight: '800' }}>Balance</Text>
        <Text>{formatter(monthIncome + monthExpense)}</Text>
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
