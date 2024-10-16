import { useNavigationContainerRef } from 'expo-router';
import { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    // debug: Env.APP_ENV === 'development',
    integrations: [
      new Sentry.ReactNativeTracing({
        routingInstrumentation,
        enableNativeFramesTracking: true,
        // ...
      }),
    ],
  });
};

export const useSentryNavigationConfig = () => {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (navigationRef) {
      routingInstrumentation.registerNavigationContainer(navigationRef);
    }
  }, [navigationRef]);
};
