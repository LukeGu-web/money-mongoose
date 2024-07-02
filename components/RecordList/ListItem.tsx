import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'components/Icon/Icon';
import { Record } from 'api/record/types';
import { useStyles, TColors } from 'core/theme';
import { useRecord } from 'core/stateHooks';

type ListItemProps = {
  item: Record;
  onPress: () => void;
};

export default function ListItem({ item, onPress }: ListItemProps) {
  const { theme, styles } = useStyles(createStyles);
  const setSelectedRecord = useRecord((state) => state.setSelectedRecord);
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        borderColor: theme[`${item.type}TextColor`],
      }}
      onPress={() => {
        setSelectedRecord(item);
        onPress();
      }}
    >
      <View style={styles.iconContainer}>
        <Icon name={item.category} size={28} color='black' />
      </View>
      <View style={styles.midContainer}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{item.category}</Text>
          {item.subcategory && (
            <Text style={styles.category}> - {item.subcategory}</Text>
          )}
        </View>
        {item.note !== '' && <Text>{item.note}</Text>}
      </View>
      <Text style={{ ...styles.amount, color: theme[`${item.type}TextColor`] }}>
        {Number(item.amount).toFixed(2)}
      </Text>
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
