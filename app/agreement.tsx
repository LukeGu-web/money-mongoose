import { router } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalStore } from 'core/stateHooks';

export default function Onboarding() {
  const setIsAcceptedAgreement = useLocalStore(
    (state) => state.setIsAcceptedAgreement
  );
  const handleAgree = () => {
    setIsAcceptedAgreement(true);
    router.navigate('/onboarding');
  };
  return (
    <View style={styles.container}>
      <Text>Agremment</Text>
      <Button title='agree' onPress={handleAgree} />
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
