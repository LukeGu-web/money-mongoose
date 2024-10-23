import { View, Pressable, Text, Image } from 'react-native';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';
const facebookLogo = require('../../assets/icons/third-party/facebook.png');

export interface FacebookUserInfo {
  profile: Profile | null;
  accessToken: AccessToken;
}

interface FacebookSignInButtonProps {
  onLoginComplete?: (userInfo: FacebookUserInfo) => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
  buttonText?: string;
}

export default function FacebookSignInButton({
  onLoginComplete,
  onError,
  onCancel,
  buttonText = 'Sign in with Facebook',
}: FacebookSignInButtonProps) {
  const permissions = ['public_profile', 'email'];
  const handleLogin = async (): Promise<void> => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(permissions);

      if (result.isCancelled) {
        console.log('User cancelled the login process');
        onCancel?.();
        return;
      }

      // Get access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Failed to get access token');
      }

      // Get user profile
      const profile = await Profile.getCurrentProfile();

      // Call the success callback with user info
      if (onLoginComplete) {
        onLoginComplete({
          profile, // profile can be null, which is now acceptable by our type
          accessToken: data,
        });
      }
    } catch (error) {
      console.error('Facebook Login Error:', error);
      if (onError) {
        onError(
          error instanceof Error ? error : new Error('Facebook login failed')
        );
      }
    }
  };

  return (
    <Pressable
      className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'
      onPress={handleLogin}
    >
      <View className='items-center w-1/6'>
        <Image className='w-6 h-6' source={facebookLogo} />
      </View>
      <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
        {buttonText}
      </Text>
    </Pressable>
  );
}
