import React from 'react';
import { Pressable, Text } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useSettingStore } from 'core/stateHooks';

export interface AppleSignInResponse {
  user: string;
  email: string | null;
  fullName: AppleAuthentication.AppleAuthenticationFullName | null;
  realUserStatus: AppleAuthentication.AppleAuthenticationUserDetectionStatus;
  identityToken: string | null;
  authorizationCode: string | null;
}
interface AppleSignInButtonProps {
  onSignInComplete?: (response: AppleSignInResponse) => void;
  onError?: (error: Error) => void;
  buttonText?: string;
  buttonType?: 'default' | 'white' | 'white-outline';
  customStyles?: {
    button?: object;
    text?: object;
    logo?: object;
  };
  requestedScopes?: AppleAuthentication.AppleAuthenticationScope[];
}

export default function AppleSignInButton({
  onSignInComplete,
  onError,
  buttonText = 'Sign in with Apple',
  requestedScopes = [
    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    AppleAuthentication.AppleAuthenticationScope.EMAIL,
  ],
}: AppleSignInButtonProps) {
  const theme = useSettingStore((state) => state.theme);
  // Check if Apple Sign In is available
  const [isAvailable, setIsAvailable] = React.useState<boolean>(false);

  React.useEffect(() => {
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

      if (onSignInComplete) {
        const response: AppleSignInResponse = {
          user: credential.user,
          email: credential.email,
          fullName: credential.fullName,
          realUserStatus: credential.realUserStatus,
          identityToken: credential.identityToken,
          authorizationCode: credential.authorizationCode,
        };
        onSignInComplete(response);
      }
    } catch (error: any) {
      if (error.code === 'ERR_CANCELED') {
        // Handle user cancellation
        console.log('User canceled Apple Sign in');
      } else {
        console.error('Apple Sign In Error:', error);
        if (onError) {
          onError(
            error instanceof Error ? error : new Error('Apple sign in failed')
          );
        }
      }
    }
  };

  // If Apple Sign In is not available, return null or alternative sign-in method
  if (!isAvailable) {
    return null;
  }

  return (
    <Pressable
      className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'
      onPress={handleSignIn}
    >
      <FontAwesome6
        name='apple'
        size={24}
        color={theme === 'dark' ? 'white' : 'black'}
      />
      <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
        {buttonText}
      </Text>
    </Pressable>
  );
}
