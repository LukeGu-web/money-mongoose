import { StyleSheet, Text } from 'react-native';
import { useStyles, TColors } from 'core/theme';
import Icon from '../Icon/Icon';

export default function Key({ value }: { value: string }) {
  const { theme, styles } = useStyles(createStyles);
  switch (value) {
    case 'delete':
      return <Icon name='delete-left' size={40} color={theme.primary} />;
    case 'calculator':
      return <Icon name='calculator' size={40} color={theme.primary} />;
    case 'clear':
    case 'new':
    case 'save':
      return <Text style={styles.text}>{value}</Text>;
    default:
      return <Text style={styles.number}>{value}</Text>;
  }
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    number: {
      fontSize: 40,
      color: theme.primary,
    },
    text: {
      fontSize: 28,
      color: theme.primary,
      fontWeight: '600',
    },
  });
