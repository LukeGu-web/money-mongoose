import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DigitalPad, RecordCategory } from 'components';

export default function Record() {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <RecordCategory />
      <DigitalPad />
      <StatusBar style='light' />
    </SafeAreaView>
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
