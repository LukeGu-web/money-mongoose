import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useStyles, TColors } from 'core/theme';

export default function BudgetCard() {
  const { theme, styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <View style={styles.verticalContainer}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Month Budget</Text>
        <View style={{ ...styles.verticalContainer, gap: 5 }}>
          <Text>set goal</Text>
          <Feather name='edit' size={14} color='black' />
        </View>
      </View>
      <View style={styles.verticalContainer}>
        <View>
          <Text>Placeholder</Text>
        </View>
        <View>
          <Text>1000</Text>
          <Text>Spend</Text>
        </View>
        <View>
          <Text>500</Text>
          <Text>Overspent</Text>
        </View>
      </View>
      <View style={styles.botContainer}>
        <View style={styles.verticalContainer}>
          <Text>Average Daily Spending</Text>
          <Text>100</Text>
        </View>
        <View style={styles.verticalContainer}>
          <Text>Remaining Daily</Text>
          <Text>10</Text>
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
    midContainer: {},
    botContainer: {
      borderWidth: 2,
      borderBottomWidth: 0,
      borderColor: 'red',
      borderStyle: 'dashed',
    },
  });
