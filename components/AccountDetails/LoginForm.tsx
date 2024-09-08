import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLoginAndFetchData } from 'api/account';

const avatarImage = require('../../assets/icon.png');

export default function LoginForm() {
  const { loginAndFetchData, isLoading, isError, error } =
    useLoginAndFetchData();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '', // username
      password: '',
    },
  });

  const handleLogin = handleSubmit(async (data) => {
    console.log('login submit: ', data);
    try {
      const { userDetails, books } = await loginAndFetchData(
        data.email,
        data.password
      );
      console.log('Login successful');
      const {
        data: { avatar, ...other },
        ...rest
      } = userDetails;
      console.log(other);
      console.log('books: ', books.data);
    } catch (err) {
      console.error('Login failed', err);
    }
  });
  return (
    <View className='flex-1 w-full gap-8 p-4'>
      <View className='items-center justify-center gap-4'>
        <Image className='w-32 h-32' source={avatarImage} />
        <Text className='text-3xl color-primary'>LOGIN</Text>
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
                placeholder='Please enter your password'
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name='password'
        />
        <Link className='ml-2' href='/'>
          <Text className='color-gray-600'>Forgot Password?</Text>
        </Link>
        <Pressable
          className='self-end w-2/5 p-2 rounded-lg bg-primary'
          disabled={isLoading}
          onPress={handleLogin}
        >
          {isLoading ? (
            <ActivityIndicator size='small' color='#fff' />
          ) : (
            <Text className='text-lg font-bold text-center color-white'>
              Login
            </Text>
          )}
        </Pressable>
      </View>
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
