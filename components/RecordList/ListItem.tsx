import { View, Text, StyleSheet } from 'react-native';
import Icon from 'components/Icon/Icon';
import { RecordVariables } from 'api/record/types';

export default function ListItem({ item }: { item: RecordVariables }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={item.category} size={28} color='black' />
      </View>
      <View style={styles.midContainer}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>time</Text>
      </View>
      <Text style={styles.date}>{item.amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: 'green',
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
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.6,
  },
});
