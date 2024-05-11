import { StyleSheet, Text } from 'react-native';
import { FontAwesome6, AntDesign } from '@expo/vector-icons';

export default function Key({ value }: { value: string }) {
  switch (value) {
    case 'delete':
      return <FontAwesome6 name='delete-left' size={40} color='#3F1D38' />;
    case 'calculator':
      return <AntDesign name='calculator' size={40} color='#3F1D38' />;
    case 'clear':
    case 'new':
    case 'save':
      return <Text style={styles.text}>{value}</Text>;
    default:
      return <Text style={styles.number}>{value}</Text>;
  }
}

const styles = StyleSheet.create({
  number: {
    fontSize: 40,
    color: '#3F1D38',
  },
  text: {
    fontSize: 28,
    color: '#3F1D38',
    fontWeight: '600',
  },
});
