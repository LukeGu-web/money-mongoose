import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { useUpdateUser } from 'api/account';
import { formatApiError } from 'api/errorFormat';
import { useUserStore } from 'core/stateHooks';
import log from 'core/logger';
import ThirdPartyLogin from './ThirdPartyLogin';

const avatarImage = require('../../assets/icon.png');

export default function SignUpForm() {
  const { mutate: updateUserApi, isPending } = useUpdateUser();
  const { user, setUser } = useUserStore();
  const {
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      'confirm-password': '',
    },
  });

  const handleLogin = handleSubmit((data) => {
    updateUserApi(
      {
        id: user.id,
        user: {
          email: data.email,
          username: data.email,
          password: data.password,
        },
        account_status: 'registered',
      },
      {
        onSuccess: (response) => {
          const { avatar, ...rest } = response;
          log.success('Register user success:', rest);
          setUser({
            ...user,
            email: data.email,
            account_status: 'registered',
          });
          reset();
          router.navigate({
            pathname: '/user/register',
            params: { reason: 'login' },
          });
        },
        onError: (error) => {
          log.error(
            'Upload image from gallery: Error: ',
            formatApiError(error)
          );
        },
      }
    );
  });
  return (
    <View className='flex-1 w-full gap-8 p-4'>
      <View className='items-center justify-center gap-4'>
        <Image className='w-32 h-32' source={avatarImage} />
        <Text className='text-3xl font-semibold color-primary dark:color-blue-100'>
          SIGN UP
        </Text>
      </View>
      <View className='ml-4'>
        {errors.email && (
          <Text className='color-red-500'>{errors.email.message}</Text>
        )}
        {errors.password && (
          <Text className='color-red-500'>{errors.password.message}</Text>
        )}
        {errors['confirm-password'] && (
          <Text className='color-red-500'>
            {errors['confirm-password'].message}
          </Text>
        )}
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
                className='w-full p-3 border-2 rounded-lg border-zinc-600'
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
          rules={{
            required: {
              value: true,
              message: 'Please enter your password.',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text className='ml-1 color-primary dark:color-white'>
                Password
              </Text>
              <TextInput
                className='w-full p-3 border-2 rounded-lg border-zinc-600'
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
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Please repeat your password.',
            },
            validate: (val: string) => {
              if (watch('password') != val) {
                return 'Your passwords do no match';
              }
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text className='ml-1 color-primary dark:color-white'>
                Confirm Password
              </Text>
              <TextInput
                className='w-full p-3 border-2 rounded-lg border-zinc-600'
                placeholder='Please repeat your password'
                placeholderTextColor='#a1a1aa'
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name='confirm-password'
        />
        <Pressable
          className='self-end w-2/5 p-2 rounded-lg bg-primary'
          disabled={isPending}
          onPress={handleLogin}
        >
          {isPending ? (
            <ActivityIndicator size='small' color='#fff' />
          ) : (
            <Text className='text-lg font-bold text-center color-white'>
              Sign Up
            </Text>
          )}
        </Pressable>
      </View>
      <ThirdPartyLogin />
    </View>
  );
}
