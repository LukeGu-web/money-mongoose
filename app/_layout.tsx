import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { APIProvider } from 'api/api-provider';
import { Colors, useTheme } from 'core/theme';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

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
  console.log('colorScheme: ', colorScheme);
  //   const colorScheme = 'dark';
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? Colors.dark : Colors.light);
  }, []);
  return (
    <APIProvider>
      {children}
      <Toast />
    </APIProvider>
  );
}
