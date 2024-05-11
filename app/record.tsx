import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DigitalPad } from 'components';

export default function Record() {
  return (
    <View style={styles.container}>
      <DigitalPad />
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
