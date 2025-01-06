import { BlurView } from 'expo-blur';
import { useEffect, useRef, useState } from 'react';
import { AppState, Alert } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as LocalAuthentication from 'expo-local-authentication';
import { PostHogProvider } from 'posthog-react-native';
import { useShallow } from 'zustand/react/shallow';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { APIProvider } from 'api/api-provider';
import { useSettingStore } from 'core/stateHooks';
import log from 'core/logger';
import { usePushNotifications } from 'core/features/usePushNotifications';

export default function Providers({ children }: { children: React.ReactNode }) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const { isEnabledBlur, isEnabledAuth, lockTime } = useSettingStore(
    useShallow((state) => ({
      isEnabledAuth: state.isEnabledAuth,
      isEnabledBlur: state.isEnabledBlur,
      lockTime: state.lockTime,
    }))
  );

  const isEnabledAuthRef = useRef(isEnabledAuth);
  const lastAuthTimeRef = useRef(0);

  // Enable Push Notifications
  usePushNotifications();

  // Update the ref whenever isEnabledAuth changes
  useEffect(() => {
    isEnabledAuthRef.current = isEnabledAuth;
  }, [isEnabledAuth]);

  const onBiometric = async () => {
    if (Date.now() - lastAuthTimeRef.current < lockTime * 60000) return; // Prevent auth more than once lock time (minutes)
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (compatible) {
        const support =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        log.info('Supported Authentication Types', support);
      }
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics) {
        Alert.alert(
          'Biometric record not found',
          'Please verify your identity with your password',
          [{ text: 'OK' }]
        );
        return;
      }
      const bioAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Use biometric login',
        cancelLabel: 'Cancel',
        disableDeviceFallback: true,
      });
      if (bioAuth.success) {
        lastAuthTimeRef.current = Date.now();
        log.success('Biometric Login: OK');
      } else {
        // Handle failed authentication (e.g., lock the app or show a message)
        log.error('Authentication failed');
      }
    } catch (error) {
      log.error('Authentication error:', error);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        isEnabledAuthRef.current
      ) {
        // when user are back to app, need to be verified by biometirc
        onBiometric();
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      log.info('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <PostHogProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
      autocapture={{
        captureTouches: true,
        captureLifecycleEvents: true,
        captureScreens: true,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <APIProvider>
          {appStateVisible !== 'active' && isEnabledBlur && (
            <BlurView
              intensity={20}
              tint='light'
              className='absolute top-0 left-0 z-10 flex-1 w-full h-full'
            />
          )}
          <BottomSheetModalProvider>
            <KeyboardProvider>{children}</KeyboardProvider>
          </BottomSheetModalProvider>
          <Toast topOffset={60} />
        </APIProvider>
      </GestureHandlerRootView>
    </PostHogProvider>
  );
}
