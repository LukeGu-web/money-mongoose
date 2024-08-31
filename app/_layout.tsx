import { SplashScreen, Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { useEffect, useRef, useState } from 'react';
import { AppState, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { colorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { APIProvider } from 'api/api-provider';
import { useLocalStore } from 'core/stateHooks';
import log from 'core/logger';
import { Icon } from 'components';
import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {
  const [fontsLoaded] = useFonts({
    IcoMoon: require('../assets/icomoon.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Providers>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#03045E' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
        <Stack.Screen name='user/onboarding' options={{ headerShown: false }} />
        <Stack.Screen name='user/agreement' options={{ headerShown: false }} />
        <Stack.Screen name='media/camera' options={{ headerShown: false }} />
        <Stack.Screen
          name='records/index'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='asset/details'
          options={{
            title: 'Account Details',
            headerLeft: () => <GoBack />,
          }}
        />
        <Stack.Screen
          name='asset/management'
          options={{
            title: 'Asset Management',
            headerLeft: () => <GoBack />,
          }}
        />
        <Stack.Screen
          name='asset/records'
          options={{
            title: 'Records of Account',
            headerLeft: () => <GoBack />,
          }}
        />
        <Stack.Screen
          name='book/management'
          options={{
            title: 'Book Management',
            headerLeft: () => (
              <Pressable
                className='py-2 pr-8'
                onPress={() => router.replace('/')}
              >
                <Icon name='left' size={24} color='#fff' />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name='book/details'
          options={{
            title: 'Book Details',
            headerLeft: () => <GoBack />,
          }}
        />
      </Stack>
    </Providers>
  );
}

const GoBack = () => (
  <Pressable className='py-2 pr-8' onPress={() => router.back()}>
    <Icon name='left' size={24} color='#fff' />
  </Pressable>
);

function Providers({ children }: { children: React.ReactNode }) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const isEnabledBlur = useLocalStore((state) => state.isEnabledBlur);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
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
