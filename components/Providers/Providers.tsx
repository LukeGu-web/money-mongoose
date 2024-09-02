import { BlurView } from 'expo-blur';
import { useEffect, useRef, useState } from 'react';
import { AppState, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { colorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as LocalAuthentication from 'expo-local-authentication';
import { useShallow } from 'zustand/react/shallow';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { APIProvider } from 'api/api-provider';
import { useSettingStore } from 'core/stateHooks';
import log from 'core/logger';

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

  // Update the ref whenever isEnabledAuth changes
  useEffect(() => {
    isEnabledAuthRef.current = isEnabledAuth;
  }, [isEnabledAuth]);

  const onBiometric = async () => {
    if (Date.now() - lastAuthTimeRef.current < lockTime * 60000) return; // Prevent auth more than once lock time (minutes)
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      log.info('BiometricSupported', compatible);
      if (compatible) {
        await LocalAuthentication.supportedAuthenticationTypesAsync();
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
        Alert.alert('Success Bio Login', 'Success!', [
          {
            text: 'OK',
            onPress: async () => {
              log.success('Biometric Login: OK');
            },
          },
        ]);
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
  // Use imperatively
  colorScheme.set('system');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <APIProvider>
        {appStateVisible !== 'active' && isEnabledBlur && (
          <BlurView
            intensity={20}
            tint='light'
            className='absolute top-0 left-0 z-10 flex-1 w-full h-full'
          />
        )}
        <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        <Toast />
      </APIProvider>
    </GestureHandlerRootView>
  );
}
