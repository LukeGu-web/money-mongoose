import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Get Rich',
  slug: 'money-mongoose',
  plugins: [
    [
      '@react-native-google-signin/google-signin',
      {
        iosUrlScheme: process.env.EXPO_PUBLIC_GOOGLE_SIGNIN_IOS_URL,
      },
    ],
  ],
});
