import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';

import { setHeaderToken } from 'api/client';
import { BudgetCard, ExpenseCard, RecordList } from 'components';
import { useStyles, TColors } from 'core/theme';
import { useLocalStore, useRecordStore } from 'core/stateHooks';

export default function Home() {
  const { styles } = useStyles(createStyles);
  const token = useLocalStore((state) => state.token);
  const records = useRecordStore((state) => state.records);
  useEffect(() => {
    setHeaderToken(token);
  }, []);

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

  return (
    <View style={styles.container}>
      <View style={styles.expenseContainer}>
        <ExpenseCard monthIncome={monthIncome} monthExpense={monthExpense} />
      </View>
      <View style={styles.budgetContainer}>
        <BudgetCard monthExpense={monthExpense} />
      </View>
      <View style={styles.listContainer}>
        <RecordList />
      </View>
      <StatusBar style='light' />
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      gap: 6,
      padding: 5,
    },
    expenseContainer: {
      height: 120,
      borderRadius: 10,
      backgroundColor: 'powderblue',
    },
    budgetContainer: {
      height: 160,
      borderRadius: 10,
      backgroundColor: 'skyblue',
    },
    listContainer: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: 'steelblue',
    },
  });
