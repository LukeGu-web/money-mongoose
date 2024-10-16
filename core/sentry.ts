import { useNavigationContainerRef } from 'expo-router';
import { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

export const initSentry = () => {
  Sentry.init({
    dsn: 'https://4d6698e27f8c85e7f0a2162b49dee3cb@o4508129228226560.ingest.us.sentry.io/4508129275019264',
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
