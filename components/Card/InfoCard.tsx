import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useStyles, TColors } from 'core/theme';
import { formatter } from 'core/utils';

export default function InfoCard() {
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text>Borrow</Text>
          <Text>0.00</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>Lend</Text>
          <Text>0.00</Text>
        </View>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text>Reimbursed</Text>
          <Text>0.00</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>To Reimburse</Text>
          <Text>0.00</Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 6,
    },
    infoBox: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: theme.bgPrimary,
      padding: 6,
    },
    infoRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
