import { clearAll, getAllKeys } from 'core/localStorage/storage';
import { useLocalStore, useRecordStore } from 'core/stateHooks';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Account() {
  const reset = useLocalStore((state) => state.reset);
  const resetRecords = useRecordStore((state) => state.resetRecords);
  return (
    <View style={styles.container}>
      <Text>Account page</Text>
      <Button onPress={getAllKeys} title='Get all keys' />
      <Button onPress={clearAll} title='Clear all keys' />
      <Button onPress={reset} title='Reset local store' />
      <Button onPress={resetRecords} title='Reset records store' />
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
