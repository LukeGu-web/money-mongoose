import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Updates from 'expo-updates';
import dayjs from 'dayjs';
import { useUserDetails } from 'api/account';
import { useUserStore } from 'core/stateHooks';
import { clearAll } from 'core/localStorage/storage';
import Icon from '../Icon/Icon';
import NicknameModal from 'components/Modal/NicknameModal';

export default function Details() {
  const { data } = useUserDetails();
  const { user, setUser } = useUserStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      if (
        data.account_status !== user.account_status ||
        data.nickname !== user.nickname
      ) {
        setUser({
          ...user,
          account_status: data.account_status as string,
          nickname: data.nickname as string,
        });
      }
    }
  }, [data]);

  return (
    <View className='items-center flex-1 w-full gap-4 p-2'>
      <View>
        <Text className='text-sm color-zinc-700'>Basic Information</Text>
        <View className='p-2 rounded-lg bg-zinc-100'>
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={() => setIsVisible(true)}
          >
            <Text>Nickame</Text>
            <View className='flex-row gap-2'>
              <Text>{user.nickname}</Text>
              <Icon name='arrow-right' size={16} color='black' />
            </View>
          </Pressable>
          <Pressable className='flex-row items-center justify-between w-full h-12'>
            <View className='flex-row items-center justify-center gap-2'>
              <Text>Email</Text>
              <View
                className={`px-2 rounded-full ${
                  user.account_status === 'verified'
                    ? 'bg-green-600'
                    : 'bg-red-600'
                }`}
              >
                <Text className='text-sm font-semibold color-white'>
                  {user.account_status === 'verified'
                    ? 'verified'
                    : 'unverified'}
                </Text>
              </View>
            </View>

            <View className='flex-row gap-2'>
              <Text>{user.email || 'unset'}</Text>
              <Icon name='arrow-right' size={16} color='black' />
            </View>
          </Pressable>
        </View>
      </View>
      <View className='w-full'>
        <Text className='text-sm color-zinc-700'>Account Information</Text>
        <View className='gap-2 p-2 rounded-lg bg-zinc-100'>
          <View className='flex-row items-center justify-between'>
            <Text>ID</Text>
            <Pressable className='flex-row items-center justify-between w-1/2 gap-2'>
              <Text className='flex-1 text-sm'>{user.account_id}</Text>
              <Icon name='copy' size={16} color='#000' />
            </Pressable>
          </View>
          <View className='flex-row justify-between'>
            <Text>Registration Date</Text>
            <Text>{dayjs(user.date_joined).format('MMMM YYYY')}</Text>
          </View>
        </View>
      </View>
      <View className='items-center justify-center w-full gap-4 mt-8'>
        <Pressable
          className='flex-row items-center justify-center w-3/5 gap-2 px-4 py-2 rounded-lg bg-amber-400'
          onPress={() => {
            clearAll();
            Updates.reloadAsync();
          }}
        >
          <Text className='text-lg font-bold'>Logout</Text>
        </Pressable>
        <Pressable className='flex-row items-center px-4 py-2'>
          <Text className='text-lg font-bold underline color-red-700'>
            Delete Account
          </Text>
        </Pressable>
      </View>
      <NicknameModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </View>
  );
}
