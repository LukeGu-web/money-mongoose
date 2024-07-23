import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'components/Icon/Icon';
import { AccountType } from 'api/asset/types';
import { useStyles, TColors } from 'core/theme';
import { useAsset } from 'core/stateHooks';

type ListItemProps = {
  item: AccountType;
  onPress: () => void;
};

export default function ListItem({ item, onPress }: ListItemProps) {
  const { theme, styles } = useStyles(createStyles);
  // const setSelectedRecord = useRecord((state) => state.setSelectedRecord);
  const setSelect = useAsset((state) => state.setSelect);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setSelect(item);
        onPress();
      }}
    >
      {/* <View style={styles.iconContainer}>
        <Icon name={item.name} size={28} color='black' />
      </View> */}
      <View style={styles.midContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.accountName}</Text>
          {item.isCredit && <Text style={styles.credit}>[credit]</Text>}
        </View>
        {item.note !== '' && <Text style={styles.note}>{item.note}</Text>}
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
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 4,
      paddingBottom: 4,
    },
    name: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    credit: {
      color: 'red',
      fontSize: 10,
      marginBottom: 2,
    },
    note: {
      color: '#6c757d',
    },
    amount: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
