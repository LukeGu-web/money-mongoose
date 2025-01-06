import { useEffect, useState } from 'react';
import { Alert, View, Text, Pressable } from 'react-native';
import * as Updates from 'expo-updates';
import * as Clipboard from 'expo-clipboard';
import dayjs from 'dayjs';
import { useUserDetails, useDeleteUser, useVerifyEmail } from 'api/account';
import { useUserStore, useSettingStore } from 'core/stateHooks';
import { clearAll } from 'core/localStorage/storage';
import { successToaster } from 'core/toaster';
import Icon from '../Icon/Icon';
import NicknameModal from 'components/Modal/NicknameModal';

export default function Details() {
  const { data } = useUserDetails();
  const { mutate: verifyEmailApi, isPending } = useVerifyEmail();
  const { mutate: deleteUserApi } = useDeleteUser();
  const { user, setUser } = useUserStore();
  const theme = useSettingStore((state) => state.theme);
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

  const handleVerifyEmail = () => {
    verifyEmailApi(undefined, {
      onSuccess: () =>
        Alert.alert(
          'Verify your email',
          "We've just sent a verification email to your account. Please check your inbox (and spam folder, just in case) and follow the link provided to complete your registration.",
          [{ text: 'OK' }]
        ),
    });
  };

  const handleDeleteAccount = () =>
    Alert.alert(
      'Delete Account',
      `Are you sure you want to delete this account? Once deleted, the data cannot be recovered.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            deleteUserApi(
              { id: user.id },
              {
                onSuccess: () => {
                  successToaster('Delete account successfully!');
                  clearAll();
                  Updates.reloadAsync();
                },
              }
            ),
        },
      ]
    );

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(user.account_id as string);
    successToaster('Copied User ID.');
  };

  return (
    <View className='items-center flex-1 w-full gap-4 p-2'>
      <View>
        <Text className='text-sm color-zinc-700 dark:color-zinc-100'>
          Basic Information
        </Text>
        <View className='p-2 rounded-lg bg-zinc-100 dark:bg-zinc-500'>
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            onPress={() => setIsVisible(true)}
          >
            <Text className='dark:color-white'>Nickame</Text>
            <View className='flex-row gap-2'>
              <Text className='dark:color-white'>{user.nickname}</Text>
              <Icon
                name='arrow-right'
                size={16}
                color={theme === 'dark' ? 'white' : 'black'}
              />
            </View>
          </Pressable>
          <Pressable
            className='flex-row items-center justify-between w-full h-12'
            disabled={user.account_status === 'verified'}
            onPress={handleVerifyEmail}
          >
            <View className='flex-row items-center justify-center gap-2'>
              <Text className='dark:color-white'>Email</Text>
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
              <Text className='dark:color-white'>{user.email || 'unset'}</Text>
              {user.account_status !== 'verified' && (
                <Icon
                  name='arrow-right'
                  size={16}
                  color={theme === 'dark' ? 'white' : 'black'}
                />
              )}
            </View>
          </Pressable>
        </View>
      </View>
      <View className='w-full'>
        <Text className='text-sm color-zinc-700 dark:color-zinc-100'>
          Account Information
        </Text>
        <View className='gap-2 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-500'>
          <View className='flex-row items-center justify-between'>
            <Text className='dark:color-white'>ID</Text>
            <Pressable
              className='flex-row items-center justify-between w-1/2 gap-2'
              onPress={copyToClipboard}
            >
              <Text className='flex-1 text-sm dark:color-white'>
                {user.account_id}
              </Text>
              <Icon
                name='copy'
                size={16}
                color={theme === 'dark' ? 'white' : 'black'}
              />
            </Pressable>
          </View>
          <View className='flex-row justify-between'>
            <Text className='dark:color-white'>Registration Date</Text>
            <Text className='dark:color-white'>
              {dayjs(user.date_joined).format('MMMM YYYY')}
            </Text>
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
        <Pressable
          className='flex-row items-center px-4 py-2'
          onPress={handleDeleteAccount}
        >
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
