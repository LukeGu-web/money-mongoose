import { View, Text, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function ThirdPartyLogin() {
  return (
    <View>
      <Text className='self-center color-gray-400'>
        ----------- or -----------
      </Text>
      <View className='gap-3 mt-4'>
        <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6 name='google' size={20} color='#03045e' />
          </View>
          <Text className='text-lg font-semibold color-primary'>
            Continue with Google
          </Text>
        </Pressable>
        <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6 name='meta' size={20} color='blue' />
          </View>
          <Text className='w-3/4 text-lg font-semibold color-primary'>
            Continue with Meta
          </Text>
        </Pressable>
        <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6 name='apple' size={24} color='black' />
          </View>
          <Text className='text-lg font-semibold color-primary'>
            Continue with Apple
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
