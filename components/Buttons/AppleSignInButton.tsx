import { useState, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { v4 as uuid } from 'uuid';
import { useShallow } from 'zustand/react/shallow';
import { useOAuthLogin } from 'api/account';
import { OAuthProviderTypes } from 'api/types';
import { useLocalStore, useUserStore, useSettingStore } from 'core/stateHooks';
import log from 'core/logger';

export interface AppleSignInResponse {
  user: string;
  email: string | null;
  fullName: AppleAuthentication.AppleAuthenticationFullName | null;
  realUserStatus: AppleAuthentication.AppleAuthenticationUserDetectionStatus;
  identityToken: string | null;
  authorizationCode: string | null;
}
interface AppleSignInButtonProps {
  buttonText?: string;
}

export default function AppleSignInButton({
  buttonText = 'Sign in with Apple',
}: AppleSignInButtonProps) {
  const requestedScopes = [
    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    AppleAuthentication.AppleAuthenticationScope.EMAIL,
  ];
  const { mutate: oauthLogin, isPending } = useOAuthLogin();
  const { isOnBoarding, setIsOnBoarding } = useLocalStore(
    useShallow((state) => ({
      isOnBoarding: state.isOnBoarding,
      setIsOnBoarding: state.setIsOnBoarding,
    }))
  );
  const user = useUserStore((state) => state.user);
  const theme = useSettingStore((state) => state.theme);
  // Check if Apple Sign In is available
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    const checkAvailability = async () => {
      const available = await AppleAuthentication.isAvailableAsync();
      setIsAvailable(available);
    };
    checkAvailability();
  }, []);

  const handleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes,
      });
      const account_id = user.account_id ?? uuid();
      if (credential.identityToken)
        oauthLogin(
          {
            provider: OAuthProviderTypes.GOOGLE,
            accessToken: String(credential.identityToken),
            account_id: account_id,
          },
          {
            onSuccess: (response) => {
              log.success('Apple sign in success');
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
    } catch (error: any) {
      if (error.code === 'ERR_CANCELED') {
        // Handle user cancellation
        console.log('User canceled Apple Sign in');
      } else {
        console.error('Apple Sign In Error:', error);
      }
    }
  };

  // If Apple Sign In is not available, return null or alternative sign-in method
  if (!isAvailable) {
    return (
      <Text>
        Apple Sign In is not available, please use other sign-in method.
      </Text>
    );
  }

  return (
    <Pressable
      className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'
      onPress={handleSignIn}
    >
      <View className='items-center w-1/6'>
        <FontAwesome6
          name='apple'
          size={24}
          color={theme === 'dark' ? 'white' : 'black'}
        />
      </View>
      <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
        {buttonText}
      </Text>
    </Pressable>
  );
}
