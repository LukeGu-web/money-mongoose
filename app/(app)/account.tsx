import { clearAll, getAllKeys } from 'core/localStorage/storage';
import { useLocalStore, useRecordStore, useAssetStore } from 'core/stateHooks';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Account() {
  const reset = useLocalStore((state) => state.reset);
  const setToken = useLocalStore((state) => state.setToken);
  const resetRecords = useRecordStore((state) => state.resetRecords);
  const resetAccounts = useAssetStore((state) => state.resetAccounts);
  return (
    <View style={styles.container}>
      {/* <Button onPress={getAllKeys} title='Get all keys' /> */}

      <Button onPress={clearAll} title='Clear all keys' />
      <Button
        onPress={() => setToken('dd62303261c21c234bc49119a9f8ef613684e64e')}
        title='Use demo user'
      />
      <Button onPress={reset} title='Reset local store' />
      <Button onPress={resetRecords} title='Reset records store' />
      <Button onPress={resetAccounts} title='Reset accounts store' />
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
