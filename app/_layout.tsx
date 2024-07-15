import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { APIProvider } from 'api/api-provider';
import { Colors, useTheme } from 'core/theme';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {
  const [fontsLoaded] = useFonts({
    fontello: require('../assets/fontello.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Providers>
      <Stack>
        <Stack.Screen name='(app)' options={{ headerShown: false }} />
        <Stack.Screen name='onboarding' options={{ headerShown: false }} />
        <Stack.Screen name='agreement' options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  //   const colorScheme = 'dark';
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? Colors.dark : Colors.light);
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <APIProvider>
        <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        <Toast />
      </APIProvider>
    </GestureHandlerRootView>
  );
}
