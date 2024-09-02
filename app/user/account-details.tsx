import { router } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { useLocalStore } from 'core/stateHooks';

export default function AccountDetails() {
  return (
    <View className='items-center justify-center flex-1 bg-white'>
      <Text>Account Details</Text>
      <Button title='Go back' onPress={() => router.back()} />
    </View>
  );
}
