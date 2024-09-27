import { View, Text, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useSettingStore } from 'core/stateHooks';

export default function ThirdPartyLogin() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <View>
      <Text className='self-center color-gray-400'>
        ----------- or -----------
      </Text>
      <View className='gap-3 mt-4'>
        <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6
              name='google'
              size={20}
              color={theme === 'dark' ? '#dbeafe' : '#03045E'}
            />
          </View>
          <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
            Continue with Google
          </Text>
        </Pressable>
        <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6
              name='meta'
              size={20}
              color={theme === 'dark' ? '#dbeafe' : '#03045E'}
            />
          </View>
          <Text className='w-3/4 text-lg font-semibold color-primary dark:color-blue-100'>
            Continue with Meta
          </Text>
        </Pressable>
        <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6
              name='apple'
              size={24}
              color={theme === 'dark' ? 'white' : 'black'}
            />
          </View>
          <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
            Continue with Apple
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
