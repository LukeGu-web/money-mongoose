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

import { useLoginAndFetchData } from 'api/account';
import { useBookStore, useUserStore, useLocalStore } from 'core/stateHooks';
import log from 'core/logger';
import { BookType } from 'api/types';
import ThirdPartyLogin from './ThirdPartyLogin';

const avatarImage = require('../../assets/icon.png');

export default function LoginForm() {
  const { isOnBoarding, setIsOnBoarding } = useLocalStore(
    useShallow((state) => ({
      isOnBoarding: state.isOnBoarding,
      setIsOnBoarding: state.setIsOnBoarding,
    }))
  );
  const setUser = useUserStore((state) => state.setUser);
  const initBook = useBookStore((state) => state.initBook);
  const { login, isLoading, isError, error } = useLoginAndFetchData();
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
    await login(
      data.email,
      data.password,
      (token, userDetails, books) => {
        log.success('Login successful', userDetails.account_id);
        // Update your app state here
        if (userDetails) {
          const account = userDetails;
          setUser({
            id: account.id,
            account_id: account.account_id as string,
            avatar: account.avatar as string,
            nickname: account.nickname as string,
            account_status: account.account_status as string,
            email: account.user.email as string,
            date_joined: account.user.date_joined as string,
            token: token as string,
          });
        }
        if (books && books.length > 0) {
          const booksData = books as BookType[];
          initBook(booksData, booksData[0].id, booksData[0].name);
        }
        // Navigate to next page, etc.
        if (isOnBoarding) {
          router.navigate('/account');
        } else {
          setIsOnBoarding(true);
          router.navigate('/');
        }
        reset();
      },
      (error) => {
        console.error('Login failed', error);
        // Handle error (show message, etc.)
      }
    );
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
              <Text className='ml-1 color-primary'>Email</Text>
              <TextInput
                className='w-full p-3 border-2 rounded-lg border-zinc-600'
                placeholder='Please enter your email'
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
      <ThirdPartyLogin />
    </View>
  );
}
