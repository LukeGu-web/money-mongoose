import { router } from 'expo-router';
import { View, Text, Button } from 'react-native';
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
    <View className='items-center justify-center flex-1 bg-white'>
      <Text>Agremment</Text>
      <Button title='agree' onPress={handleAgree} />
    </View>
  );
}
