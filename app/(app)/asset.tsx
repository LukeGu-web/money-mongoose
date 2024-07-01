import { PieChart } from 'components/Chart/Pie';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Asset() {
  return (
    <View style={styles.container}>
      <Text>Asset page</Text>
      <PieChart />
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
