import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Link, router } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';

import { useLogin } from 'api/account';
import { formatApiError } from 'api/errorFormat';
import { useLocalStore } from 'core/stateHooks';
import log from 'core/logger';
import ThirdPartyLogin from './ThirdPartyLogin';

const avatarImage = require('../../assets/icon.png');

export default function LoginForm() {
  const { isOnBoarding, setIsOnBoarding } = useLocalStore(
    useShallow((state) => ({
      isOnBoarding: state.isOnBoarding,
      setIsOnBoarding: state.setIsOnBoarding,
    }))
  );
  const { mutate: login, isPending, isError, error } = useLogin();
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
    login(
      {
        username: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          log.success('Add asset success:', response);
          // Navigate to next page, etc.
          if (isOnBoarding) {
            router.navigate('/account');
          } else {
            setIsOnBoarding(true);
            router.navigate('/');
          }
          reset();
        },
        onError: (error) => {
          log.error('Error: ', formatApiError(error));
        },
      }
    );
  });
  return (
    <View className='flex-1 w-full gap-8 p-4'>
      <View className='items-center justify-center gap-4'>
        <Image className='w-32 h-32' source={avatarImage} />
        <Text className='text-3xl font-semibold color-primary dark:color-blue-100'>
          LOGIN
        </Text>
      </View>
      <View className='gap-4'>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Please enter your email.',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text className='ml-1 color-primary dark:color-white'>Email</Text>
              <TextInput
                className='w-full p-3 border-2 rounded-lg border-zinc-600 dark:color-white'
                placeholder='Please enter your email'
                placeholderTextColor='#a1a1aa'
                inputMode='email'
                autoCapitalize='none'
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
              <Text className='ml-1 color-primary dark:color-white'>
                Password
              </Text>
              <TextInput
                className='w-full p-3 border-2 rounded-lg border-zinc-600 dark:color-white'
                placeholder='Please enter your password'
                placeholderTextColor='#a1a1aa'
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
          <Text className='color-gray-600 dark:color-gray-200'>
            Forgot Password?
          </Text>
        </Link>
        <Pressable
          className='self-end w-2/5 p-2 rounded-lg bg-primary'
          disabled={isPending}
          onPress={handleLogin}
        >
          {isPending ? (
            <ActivityIndicator size='small' color='#fff' />
          ) : (
            <Text className='text-lg font-bold text-center color-white'>
              Login
            </Text>
          )}
        </Pressable>
      </View>
      <ThirdPartyLogin />
    </View>
  );
}
