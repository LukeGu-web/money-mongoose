import { clearAll, getAllKeys } from 'core/localStorage/storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Account() {
  return (
    <View style={styles.container}>
      <Text>Account page</Text>
      <Button onPress={getAllKeys} title='Get all keys' />
      <Button onPress={clearAll} title='Clear all keys' />
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
