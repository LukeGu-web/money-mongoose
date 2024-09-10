import Pie from 'components/Chart/Pie';
import { router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function UserAgreement() {
  return (
    <View className='items-center justify-center flex-1 '>
      <Pie />
    </View>
  );
}
