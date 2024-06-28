import { View, Text, StyleSheet } from 'react-native';
import Icon from 'components/Icon/Icon';
import { Record } from 'api/record/types';
import { useStyles, TColors } from 'core/theme';

export default function ListItem({ item }: { item: Record }) {
  const { theme, styles } = useStyles(createStyles);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme[`${item.type}BgColor`],
        borderColor: theme[`${item.type}TextColor`],
      }}
    >
      <View style={styles.iconContainer}>
        <Icon name={item.category} size={28} color='black' />
      </View>
      <View style={styles.midContainer}>
        <Text style={styles.category}>{item.category}</Text>
        {item.note !== '' && <Text>{item.note}</Text>}
      </View>
      <Text style={styles.amount}>{Number(item.amount).toFixed(2)}</Text>
    </View>
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
