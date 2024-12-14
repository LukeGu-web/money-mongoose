import { Pressable, Text, Image, View } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { v4 as uuid } from 'uuid';
import { useShallow } from 'zustand/react/shallow';

import { useOAuthLogin } from 'api/account';
import { OAuthProviderTypes } from 'api/types';
import { useLocalStore, useUserStore } from 'core/stateHooks';
import log from 'core/logger';
const googleLogo = require('../../assets/icons/third-party/google.png');

interface GoogleSignInButtonProps {
  buttonText?: string;
}

export default function GoogleSignInButton({
  buttonText = 'Sign in with Google',
}: GoogleSignInButtonProps) {
  const { mutate: oauthLogin, isPending } = useOAuthLogin();
  const { isOnBoarding, setIsOnBoarding } = useLocalStore(
    useShallow((state) => ({
      isOnBoarding: state.isOnBoarding,
      setIsOnBoarding: state.setIsOnBoarding,
    }))
  );
  const user = useUserStore((state) => state.user);

  const signIn = async (): Promise<void> => {
    try {
      // Ensure Google Sign-In is configured
      await GoogleSignin.hasPlayServices();

      // Perform the sign-in
      const userInfo = await GoogleSignin.signIn();

      // Call the callback with user info if provided
      const account_id = user.account_id ?? uuid();
      if (userInfo.data)
        oauthLogin(
          {
            provider: OAuthProviderTypes.GOOGLE,
            accessToken: String(userInfo.data.idToken),
            account_id: account_id,
          },
          {
            onSuccess: (response) => {
              log.success('Google sign in success');
              // Navigate to next page, etc.
              if (isOnBoarding) {
                router.navigate('/account');
              } else {
                setIsOnBoarding(true);
                router.navigate('/');
              }
            },
            onError: (error) => {
              log.error('Error: ', error);
            },
          }
        );
    } catch (error) {
      // Type guard to check if error is an Error object
      const errorObject = error as Error & { code?: string };
      log.error('Google Sign-In Error:', errorObject);

      switch (errorObject.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          log.info('User cancelled the sign-in flow');
          break;
        case statusCodes.IN_PROGRESS:
          log.info('Sign-in is already in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          log.info('Play services not available');
          break;
        default:
          log.info('Other error:', errorObject);
          break;
      }
    }
  };

  return (
    <Pressable
      className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'
      onPress={signIn}
    >
      <View className='items-center w-1/6'>
        <Image className='w-6 h-6' source={googleLogo} />
      </View>
      <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
        {buttonText}
      </Text>
    </Pressable>
  );
}
