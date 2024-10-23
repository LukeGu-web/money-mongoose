import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { Profile, AccessToken } from 'react-native-fbsdk-next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useSettingStore } from 'core/stateHooks';
import { GoogleSignInButton, FacebookSignInButton } from '../Buttons';
import type { FacebookUserInfo } from '../Buttons/FacebookSignInButton';

export default function ThirdPartyLogin() {
  const theme = useSettingStore((state) => state.theme);
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_SIGNIN_IOS_ID,
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  });

  const handleSignInComplete = (userInfo: User) => {
    console.log('User signed in:', userInfo);
    // Handle successful sign-in
  };

  const handleLoginComplete = ({ profile, accessToken }: FacebookUserInfo) => {
    if (profile) {
      console.log('Logged in as:', profile.name);
      console.log('User ID:', profile.userID);
    } else {
      console.log('Profile not available');
    }
    console.log('Access Token:', accessToken.accessToken);
    // Handle successful login
  };

  const handleError = (error: Error) => {
    console.error('Sign-in error:', error);
    // Handle sign-in error
  };

  const handleCancel = () => {
    console.log('Login cancelled');
  };

  return (
    <View>
      <Text className='self-center color-gray-400'>
        ----------- or -----------
      </Text>
      <View className='gap-3 mt-6'>
        <GoogleSignInButton
          onSignInComplete={handleSignInComplete}
          onError={handleError}
        />
        <FacebookSignInButton
          onLoginComplete={handleLoginComplete}
          onError={handleError}
          onCancel={handleCancel}
        />
        {/* <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6
              name='meta'
              size={20}
              color={theme === 'dark' ? '#dbeafe' : '#03045E'}
            />
          </View>
          <Text className='w-3/4 text-lg font-semibold color-primary dark:color-blue-100'>
            Continue with Meta
          </Text>
        </Pressable> */}
        <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6
              name='apple'
              size={24}
              color={theme === 'dark' ? 'white' : 'black'}
            />
          </View>
          <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
            Continue with Apple
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
