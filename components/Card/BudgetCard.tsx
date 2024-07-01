import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { useStyles, TColors } from 'core/theme';
import { useMonthlyAnalysis, useRecordStore } from 'core/stateHooks';

const formatter = (num: number) =>
  Math.abs(num).toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });

export default function BudgetCard() {
  const { styles } = useStyles(createStyles);
  const records = useRecordStore((state) => state.records);
  const goal = useMonthlyAnalysis((state) => state.goal);

  const currentMonth = dayjs().month();
  const days = dayjs().date();
  let n = 0,
    monthExpense = 0;
  while (
    dayjs(records[n]?.date).month() === currentMonth &&
    records.length > n
  ) {
    monthExpense += Number(records[n].sum_of_expense);
    n++;
  }
  const remaining = (goal ?? 0) + monthExpense;
  const dailyRemaining =
    remaining > 0 ? remaining / (dayjs().daysInMonth() - days) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.verticalContainer}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Month Budget</Text>
        <TouchableOpacity style={{ ...styles.verticalContainer, gap: 5 }}>
          <Text>{goal === null ? 'set goal' : goal}</Text>
          <Feather name='edit' size={14} color='black' />
        </TouchableOpacity>
      </View>
      <View style={[styles.verticalContainer, styles.midContainer]}>
        <View style={styles.midBlock}>
          <Text>Placeholder</Text>
        </View>
        <View style={styles.midBlock}>
          <Text>{formatter(monthExpense)}</Text>
          <Text>Spend</Text>
        </View>
        <View style={styles.midBlock}>
          <Text>{formatter(remaining)}</Text>
          <Text>{remaining > 0 ? 'Remaining' : 'Overspent'}</Text>
        </View>
      </View>
      <View style={styles.botContainer}>
        <View style={styles.verticalContainer}>
          <Text>Average Daily Spending</Text>
          <Text>{formatter(monthExpense / days)}</Text>
        </View>
        <View style={styles.verticalContainer}>
          <Text>Remaining Daily</Text>
          <Text>{formatter(dailyRemaining)}</Text>
        </View>
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
    verticalContainer: {
      // flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    midContainer: {
      flex: 1,
      gap: 5,
      alignItems: 'stretch',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    midBlock: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: theme.bgPrimary,
    },
    botContainer: {
      borderWidth: 2,
      borderBottomWidth: 0,
      borderColor: 'red',
      borderStyle: 'dashed',
    },
  });
