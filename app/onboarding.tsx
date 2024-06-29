import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <Text>On boarding</Text>
      <Button title='start' onPress={() => router.replace('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
