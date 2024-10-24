import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import {
  AppleSignInButton,
  GoogleSignInButton,
  FacebookSignInButton,
} from '../Buttons';
import type { FacebookUserInfo } from '../Buttons/FacebookSignInButton';
import type { AppleSignInResponse } from '../Buttons/AppleSignInButton';

export default function ThirdPartyLogin() {
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_SIGNIN_IOS_ID,
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  });

  const handleSignInGoogle = (userInfo: User) => {
    console.log('User signed in:', userInfo);
    // Handle successful sign-in
  };

  const handleSignInFacebook = ({ profile, accessToken }: FacebookUserInfo) => {
    if (profile) {
      console.log('Logged in as:', profile.name);
      console.log('User ID:', profile.userID);
    } else {
      console.log('Profile not available');
    }
    console.log('Access Token:', accessToken.accessToken);
    // Handle successful login
  };

  const handleSignInComplete = async (response: AppleSignInResponse) => {
    console.log('Signed in with Apple ID:', response.user);

    if (response.email) {
      console.log('Email:', response.email);
    }

    if (response.fullName) {
      const { familyName, givenName, middleName } = response.fullName;
      console.log(
        'Full name:',
        [givenName, middleName, familyName].filter(Boolean).join(' ')
      );
    }

    if (response.identityToken) {
      console.log('Identity Token:', response.identityToken);
    }
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
          onSignInComplete={handleSignInGoogle}
          onError={handleError}
        />
        <FacebookSignInButton
          onLoginComplete={handleSignInFacebook}
          onError={handleError}
          onCancel={handleCancel}
        />
        <AppleSignInButton
          onSignInComplete={handleSignInComplete}
          onError={handleError}
          buttonType='white'
          customStyles={{
            button: {
              width: '80%',
              alignSelf: 'center',
            },
          }}
        />
      </View>
    </View>
  );
}
