import { View, TextInput, Text, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { useUserStore } from 'core/stateHooks';
import Icon from '../Icon/Icon';

export default function Details() {
  const user = useUserStore((state) => state.user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.email || 'unset',
      nickname: user.nickname,
    },
  });

  const handleLogin = handleSubmit((data) => {});
  // const { avatar, ...rest } = user;
  // console.log('user: ', rest);
  return (
    <View className='items-center flex-1 w-full gap-4 p-2'>
      <View>
        <Text className='text-sm color-zinc-700'>Basic Information</Text>
        <View className='p-2 rounded-lg bg-zinc-100'>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Pressable className='flex-row items-center justify-between w-full h-12'>
                <Text>Nickame</Text>
                <View className='flex-row gap-2'>
                  <TextInput
                    placeholder='Enter the nickname'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <Icon name='arrow-right' size={16} color='black' />
                </View>
              </Pressable>
            )}
            name='nickname'
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Pressable className='flex-row items-center justify-between w-full h-12'>
                <Text>Email</Text>
                <View className='flex-row gap-2'>
                  <TextInput
                    placeholder='Enter your email'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <Icon name='arrow-right' size={16} color='black' />
                </View>
              </Pressable>
            )}
            name='email'
          />
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
        <Pressable className='flex-row items-center justify-center w-3/5 gap-2 px-4 py-2 rounded-lg bg-amber-400'>
          <Text className='text-lg font-bold'>Logout</Text>
        </Pressable>
        <Pressable className='flex-row items-center px-4 py-2'>
          <Text className='text-lg font-bold underline color-red-700'>
            Delete Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
