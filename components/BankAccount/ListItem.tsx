import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'components/Icon/Icon';
import { AccountType } from 'api/asset/types';
import { useStyles, TColors } from 'core/theme';
import { useRecord } from 'core/stateHooks';

type ListItemProps = {
  item: AccountType;
  onPress: () => void;
};

export default function ListItem({ item, onPress }: ListItemProps) {
  const { theme, styles } = useStyles(createStyles);
  // const setSelectedRecord = useRecord((state) => state.setSelectedRecord);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // setSelectedRecord(item);
        onPress();
      }}
    >
      {/* <View style={styles.iconContainer}>
        <Icon name={item.category} size={28} color='black' />
      </View> */}
      <View style={styles.midContainer}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{item.accountName}</Text>
          {item.isCredit && <Text style={styles.category}> '[credit]'</Text>}
        </View>
        {item.note !== '' && <Text>{item.note}</Text>}
      </View>
      <Text style={styles.amount}>{Number(item.balance).toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
    },
    iconContainer: {
      flex: 0.1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    midContainer: {
      flex: 0.8,
    },
    categoryContainer: {
      flexDirection: 'row',
    },
    category: {
      paddingBottom: 4,
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    amount: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
