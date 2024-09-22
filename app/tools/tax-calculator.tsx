import TaxCalculator from 'components/TaxCalculator/Calculator';
import { router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function UserAgreement() {
  return (
    <View className='items-center justify-center flex-1 w-full p-2 bg-white'>
      <TaxCalculator />
    </View>
  );
}
