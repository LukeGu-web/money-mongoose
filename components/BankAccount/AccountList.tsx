import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';
import { useStyles, TColors } from 'core/theme';

export default function AccountList() {
  const { styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <Text>No account yet</Text>
        <Button
          title='Add account'
          color='white'
          onPress={() => router.navigate('/add-bank-account')}
        />
      </View>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
