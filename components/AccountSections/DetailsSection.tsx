import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useUserStore, useSettingStore } from 'core/stateHooks';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function DetailsSection() {
  const user = useUserStore((state) => state.user);
  const theme = useSettingStore((state) => state.theme);
  return (
    <View className='items-start justify-center flex-1 gap-2 mb-4'>
      <Text className='color-zinc-600 dark:color-zinc-300'>Account</Text>
      {user.account_status === 'unregistered' ? (
        <View className='w-full rounded-lg bg-zinc-200 dark:bg-zinc-800'>
          <Pressable
            className='flex-row items-center gap-2 px-4 py-2 border-b-2 border-white'
            onPress={() =>
              router.navigate({
                pathname: '/user/register',
                params: { reason: 'login' },
              })
            }
          >
            <Entypo
              name='login'
              size={20}
              color={theme === 'dark' ? 'white' : 'black'}
            />
            <Text className='text-lg dark:color-white'>Login</Text>
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
            <Octicons
              name='person-add'
              size={20}
              color={theme === 'dark' ? 'white' : 'black'}
            />
            <Text className='text-lg dark:color-white'>Sign Up</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          className='flex-row items-center w-full gap-2 px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800'
          onPress={() => router.navigate('/user/account-details')}
        >
          <MaterialCommunityIcons
            name='card-account-details-outline'
            size={20}
            color={theme === 'dark' ? 'white' : 'black'}
          />
          <Text className='text-lg dark:color-white'>Account Details</Text>
        </Pressable>
      )}
    </View>
  );
}
