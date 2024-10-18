import { router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function Budget() {
  return (
    <View className='items-center justify-center flex-1 bg-white'>
      <Text>Budget</Text>
      <Button title='Go back' onPress={() => router.back()} />
    </View>
  );
}
