import { Pressable, Text, Image, View } from 'react-native';
import {
  GoogleSignin,
  User,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface GoogleSignInButtonProps {
  onSignInComplete?: (userInfo: User) => void;
  onError?: (error: Error) => void;
  buttonText?: string;
}

export default function GoogleSignInButton({
  onSignInComplete,
  onError,
  buttonText = 'Sign in with Google',
}: GoogleSignInButtonProps) {
  const signIn = async (): Promise<void> => {
    try {
      // Ensure Google Sign-In is configured
      await GoogleSignin.hasPlayServices();

      // Perform the sign-in
      const userInfo = await GoogleSignin.signIn();

      // Call the callback with user info if provided
      if (onSignInComplete) {
        onSignInComplete(userInfo as any);
      }
    } catch (error) {
      // Type guard to check if error is an Error object
      const errorObject = error as Error & { code?: string };

      console.error('Google Sign-In Error:', errorObject);

      if (onError) {
        onError(errorObject);
      }

      switch (errorObject.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('User cancelled the sign-in flow');
          break;
        case statusCodes.IN_PROGRESS:
          console.log('Sign-in is already in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Play services not available');
          break;
        default:
          console.log('Other error:', errorObject);
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
        <Image
          className='w-6 h-6'
          source={{
            uri: 'https://developers.google.com/identity/images/g-logo.png',
          }}
        />
      </View>
      <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
        {buttonText}
      </Text>
    </Pressable>
  );
}
