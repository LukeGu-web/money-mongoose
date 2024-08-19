import { Text, View } from 'react-native';
import { formatter } from 'core/utils';

export default function InfoCard() {
  return (
    <View className='flex-row justify-between flex-1 gap-3'>
      <View className='flex-1 p-3 bg-gray-100 rounded-lg'>
        <View className='flex-row items-center justify-between flex-1'>
          <Text>Borrow</Text>
          <Text>0.00</Text>
        </View>
        <View className='flex-row items-center justify-between flex-1'>
          <Text>Lend</Text>
          <Text>0.00</Text>
        </View>
      </View>
      <View className='flex-1 p-2 bg-gray-100 rounded-lg'>
        <View className='flex-row items-center justify-between flex-1'>
          <Text>Unreimbursed</Text>
          <Text>0.00</Text>
        </View>
        <View className='flex-row items-center justify-between flex-1'>
          <Text>Reimbursed</Text>
          <Text>0.00</Text>
        </View>
      </View>
    </View>
  );
}
