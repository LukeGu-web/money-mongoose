import { Alert, View, Pressable, Text, Image, Platform } from 'react-native';
import {
  LoginManager,
  AccessToken,
  AuthenticationToken,
} from 'react-native-fbsdk-next';
import { router } from 'expo-router';
import { v4 as uuid } from 'uuid';
import { useShallow } from 'zustand/react/shallow';
import { useOAuthLogin } from 'api/account';
import { OAuthProviderTypes } from 'api/types';
import { useLocalStore, useUserStore } from 'core/stateHooks';
import log from 'core/logger';
const facebookLogo = require('../../assets/icons/third-party/facebook.png');

interface FacebookSignInButtonProps {
  buttonText?: string;
}

export default function FacebookSignInButton({
  buttonText = 'Sign in with Facebook',
}: FacebookSignInButtonProps) {
  const permissions = ['public_profile', 'email'];
  const { mutate: oauthLogin, isPending } = useOAuthLogin();
  const { isOnBoarding, setIsOnBoarding } = useLocalStore(
    useShallow((state) => ({
      isOnBoarding: state.isOnBoarding,
      setIsOnBoarding: state.setIsOnBoarding,
    }))
  );
  const user = useUserStore((state) => state.user);

  const handleLogin = async (): Promise<void> => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(
        permissions,
        'limited' // Limited Login
      );

      if (result.isCancelled) {
        log.info('User cancelled the login process');
        return;
      }

      // Get access token
      const data =
        Platform.OS === 'ios'
          ? await AuthenticationToken.getAuthenticationTokenIOS()
          : await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Failed to get access token');
      }

      const account_id = user.account_id ?? uuid();
      const token =
        Platform.OS === 'ios'
          ? (data as AuthenticationToken).authenticationToken
          : (data as AccessToken).accessToken;

      oauthLogin(
        {
          provider: OAuthProviderTypes.FACEBOOK,
          accessToken: token,
          account_id: account_id,
        },
        {
          onSuccess: (response) => {
            log.success('Facebook sign in success');
            if (isOnBoarding) {
              router.push('/account');
            } else {
              setIsOnBoarding(true);
              router.push('/');
            }
          },
          onError: (error) => {
            log.error('OAuth login error:', error);
            Alert.alert(
              'Login Failed',
              'Unable to sign in with Facebook. Please try again later.'
            );
          },
        }
      );
    } catch (error) {
      log.error('Facebook Login Error:', error);
      Alert.alert(
        'Login Error',
        'An error occurred during Facebook login. Please try again.'
      );
    }
  };
  return (
    <Pressable
      className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'
      onPress={handleLogin}
    >
      <View className='items-center w-1/6'>
        <Image className='w-7 h-7' source={facebookLogo} />
      </View>
      <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
        {buttonText}
      </Text>
    </Pressable>
  );
}
