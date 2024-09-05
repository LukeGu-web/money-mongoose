import { View, Text, Image, Pressable, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const avatarImage = require('../../assets/icon.png');

export default function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      'confirm-password': '',
    },
  });

  const handleLogin = handleSubmit((data) => {});
  return (
    <View className='flex-1 w-full gap-8 p-4'>
      <View className='items-center justify-center gap-4'>
        <Image className='w-32 h-32' source={avatarImage} />
        <Text className='text-3xl color-primary'>SIGN UP</Text>
      </View>
      <View className='gap-4'>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text className='ml-1 color-primary'>Email</Text>
              <TextInput
                className='w-full p-3 border-2 rounded-lg border-zinc-600'
                placeholder='Please enter the budget amount'
                keyboardType='numeric'
                autoFocus={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name='email'
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text className='ml-1 color-primary'>Password</Text>
              <TextInput
                className='w-full p-3 border-2 rounded-lg border-zinc-600'
                placeholder='Please enter the budget amount'
                keyboardType='numeric'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name='password'
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text className='ml-1 color-primary'>Confirm Password</Text>
              <TextInput
                className='w-full p-3 border-2 rounded-lg border-zinc-600'
                placeholder='Please enter the budget amount'
                keyboardType='numeric'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name='confirm-password'
        />
        <Pressable className='self-end w-2/5 p-2 rounded-lg bg-primary'>
          <Text className='text-lg font-bold text-center color-white'>
            Sign Up
          </Text>
        </Pressable>
      </View>
      <Text className='self-center color-gray-400'>
        ----------- or -----------
      </Text>
      <View className='gap-3'>
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
