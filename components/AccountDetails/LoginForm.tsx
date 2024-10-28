import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Link, router } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';

import { useLogin } from 'api/account';
import { formatApiError } from 'api/errorFormat';
import { useLocalStore } from 'core/stateHooks';
import log from 'core/logger';
import ThirdPartyLogin from './ThirdPartyLogin';
import { successToaster } from 'core/toaster';

const avatarImage = require('../../assets/icon.png');

export default function LoginForm() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? -100 : 0;
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
  if (isError) {
    throw new Error(
      `Error (Login): Endpoint: ${process.env.EXPO_PUBLIC_API_URL}`
    );
  }
  const handleLogin = handleSubmit(async (data) => {
    login(
      {
        username: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          successToaster('Login successfully');
          log.success('Login success:', response);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ gap: 16, width: '100%' }}
      >
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
                className='w-full p-3 bg-white border-2 rounded-lg border-zinc-600 dark:color-white dark:bg-black'
                placeholder='Please enter your email'
                placeholderTextColor='#a1a1aa'
                inputMode='email'
                autoCapitalize='none'
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
                className='w-full p-3 bg-white border-2 rounded-lg border-zinc-600 dark:color-white dark:bg-black'
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
            <ActivityIndicator size='small' color='white' />
          ) : (
            <Text className='text-lg font-bold text-center color-white'>
              Login
            </Text>
          )}
        </Pressable>
      </KeyboardAvoidingView>
      <ThirdPartyLogin />
    </View>
  );
}
