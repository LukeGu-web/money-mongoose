import { View, Text, Button, StyleSheet } from 'react-native';
import { router, Redirect } from 'expo-router';
import { useLocalStore } from 'core/stateHooks';

export default function Onboarding() {
  const isAcceptedAgreement = useLocalStore(
    (state) => state.isAcceptedAgreement
  );
  const setIsOnBoarding = useLocalStore((state) => state.setIsOnBoarding);
  if (!isAcceptedAgreement) {
    return <Redirect href='/agreement' />;
  }
  const handleStart = () => {
    setIsOnBoarding(true);
    router.replace('/');
  };
  return (
    <View style={styles.container}>
      <Text>On boarding</Text>
      <Button title='start' onPress={handleStart} />
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
