import { View, Text, StyleSheet } from 'react-native';
import { RecordsByDay } from 'api/record/types';
import ListItem from './ListItem';
import { useStyles, TColors } from 'core/theme';

export default function ListDayItem({ item }: { item: RecordsByDay }) {
  const { theme, styles } = useStyles(createStyles);
  let formattedDate = new Date(item.date).toLocaleDateString('en-gb', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
  if (item.date === new Date().toISOString().split('T')[0]) {
    formattedDate = 'Today ' + formattedDate;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.category}>{formattedDate}</Text>
        <View style={styles.amountContainer}>
          {item.sum_of_income > 0 && (
            <Text style={{ ...styles.category, color: theme.incomeTextColor }}>
              Income: {item.sum_of_income}
            </Text>
          )}
          {item.sum_of_expense < 0 && (
            <Text style={{ ...styles.category, color: theme.expenseTextColor }}>
              Expense: {item.sum_of_expense}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.midContainer}>
        {item.records.map((record, index) => (
          <ListItem key={`${record.created_at}`} item={record} />
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      padding: 8,
      flexDirection: 'column',
    },
    headerContainer: {
      flex: 0.1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    amountContainer: {
      flexDirection: 'row',
      gap: 5,
    },
    midContainer: {
      flex: 0.8,
    },
    category: {
      paddingBottom: 4,
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    date: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
      opacity: 0.6,
    },
  });
