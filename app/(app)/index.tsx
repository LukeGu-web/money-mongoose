import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useStyles, TColors } from 'core/theme';
import { BudgetCard, ExpenseCard, RecordList } from 'components';

export default function Home() {
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.expenseContainer}>
        <ExpenseCard />
      </View>
      <View style={styles.budgetContainer}>
        <BudgetCard />
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
      gap: 5,
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
