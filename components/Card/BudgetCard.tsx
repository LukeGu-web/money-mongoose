import { StyleSheet, Text, View } from 'react-native';
import { useStyles, TColors } from 'core/theme';

export default function BudgetCard() {
  const { theme, styles } = useStyles(createStyles);
  return <View style={styles.container}></View>;
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {},
    text: {},
  });
