import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { useLocalStore } from 'core/stateHooks';

export default function AccountDetails() {
  const params = useLocalSearchParams();
  return (
    <View className='items-center justify-center flex-1 bg-white'>
      <Text>{params.reason}</Text>
      <Button title='Go back' onPress={() => router.back()} />
    </View>
  );
}
