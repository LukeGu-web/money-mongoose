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
    [
      'react-native-fbsdk-next',
      {
        appID: process.env.EXPO_PUBLIC_FB_SIGNIN_IOS_ID,
        clientToken: process.env.EXPO_PUBLIC_FB_SIGNIN_IOS_CLIENT_TOKEN,
        displayName: 'Get Rich',
        scheme: `fb${process.env.EXPO_PUBLIC_FB_SIGNIN_IOS_ID}`,
        advertiserIDCollectionEnabled: false,
        autoLogAppEventsEnabled: false,
        isAutoInitEnabled: true,
        iosUserTrackingPermission:
          'This identifier will be used to deliver personalized ads to you.',
      },
    ],
  ],
});
