import { useAccounts } from 'core/stateHooks';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function Account() {
  const resetAccounts = useAccounts((state) => state.resetAccounts);
  return (
    <ScrollView style={styles.container}>
      <Text>Edit accounts</Text>
      <StatusBar style='light' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
