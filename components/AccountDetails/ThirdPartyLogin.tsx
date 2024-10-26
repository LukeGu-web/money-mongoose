import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  AppleSignInButton,
  GoogleSignInButton,
  FacebookSignInButton,
} from '../Buttons';

export default function ThirdPartyLogin() {
  useEffect(() => {
    const configureGoogleSignIn = () => {
      GoogleSignin.configure({
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_SIGNIN_IOS_ID,
      });
    };
    configureGoogleSignIn();
  }, []);

  return (
    <View>
      <Text className='self-center color-gray-400'>
        ----------- or -----------
      </Text>
      <View className='gap-3 mt-6'>
        <GoogleSignInButton />
        <FacebookSignInButton />
        <AppleSignInButton />
      </View>
    </View>
  );
}
