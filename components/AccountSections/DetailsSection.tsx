import { View, Text, Pressable } from 'react-native';
import { useUserStore } from 'core/stateHooks';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function DetailsSection() {
  const user = useUserStore((state) => state.user);
  return (
    <View className='items-start justify-center flex-1 gap-2 mb-4'>
      <Text className='color-zinc-600'>Account</Text>
      {user.account_status !== 'unregistered' ? (
        <Pressable
          className='flex-row items-center w-full gap-2 px-4 py-2 bg-blue-400 rounded-lg'
          onPress={() => router.navigate('/user/account-details')}
        >
          <MaterialCommunityIcons
            name='card-account-details-outline'
            size={20}
            color='white'
          />
          <Text className='text-lg color-white'>Account Details</Text>
        </Pressable>
      ) : (
        <View className='w-full bg-blue-400 rounded-lg'>
          <Pressable
            className='flex-row items-center gap-2 px-4 py-2 border-b-2 border-white'
            onPress={() =>
              router.navigate({
                pathname: '/user/register',
                params: { reason: 'login' },
              })
            }
          >
            <Entypo name='login' size={20} color='white' />
            <Text className='text-lg color-white'>Login</Text>
          </Pressable>
          <Pressable
            className='flex-row items-center gap-2 px-4 py-2'
            onPress={() =>
              router.navigate({
                pathname: '/user/register',
                params: { reason: 'sign-up' },
              })
            }
          >
            <Octicons name='person-add' size={20} color='white' />
            <Text className='text-lg color-white'>Sign Up</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
