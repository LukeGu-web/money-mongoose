import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TouchableOpacityProps,
} from 'react-native';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';

// Update the interface to allow null
export interface FacebookUserInfo {
  profile: Profile | null; // Changed from Profile | undefined to Profile | null
  accessToken: AccessToken;
}

interface CustomFacebookLoginButtonProps
  extends Omit<TouchableOpacityProps, 'onPress'> {
  onLoginComplete?: (userInfo: FacebookUserInfo) => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
  buttonText?: string;
  permissions?: string[];
  customStyles?: {
    button?: object;
    text?: object;
    logo?: object;
  };
}

const CustomFacebookLoginButton: React.FC<CustomFacebookLoginButtonProps> = ({
  onLoginComplete,
  onError,
  onCancel,
  buttonText = 'Continue with Facebook',
  permissions = ['public_profile', 'email'],
  customStyles,
  ...touchableProps
}) => {
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
    <TouchableOpacity
      style={[styles.button, customStyles?.button]}
      onPress={handleLogin}
      activeOpacity={0.7}
      {...touchableProps}
    >
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png',
        }}
        style={[styles.logo, customStyles?.logo]}
      />
      <Text style={[styles.text, customStyles?.text]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1877F2', // Facebook blue
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomFacebookLoginButton;
