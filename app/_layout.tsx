import { SplashScreen, Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useColorScheme, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { APIProvider } from 'api/api-provider';
import { Colors, useTheme } from 'core/theme';
import { Icon } from 'components';
import '../global.css';
import Toast from 'react-native-toast-message';

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
        <Stack.Screen name='onboarding' options={{ headerShown: false }} />
        <Stack.Screen name='agreement' options={{ headerShown: false }} />
        <Stack.Screen name='media/camera' options={{ headerShown: false }} />
        <Stack.Screen
          name='records/index'
          options={{
            title: 'Record list',
            headerLeft: () => <GoBack />,
            headerRight: () => (
              <TouchableOpacity>
                <Icon name='setting' size={24} color='#fff' />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name='asset/details'
          options={{
            title: 'Add Bank Account',
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
          name='book/management'
          options={{
            title: 'Book Management',
            headerLeft: () => <GoBack url='/' />,
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

const GoBack = ({ url }: { url?: string }) => (
  <TouchableOpacity
    style={{
      paddingVertical: 8,
      paddingRight: 24,
    }}
    onPress={() => (url ? router.navigate(url) : router.back())}
  >
    <Icon name='left' size={24} color='#fff' />
  </TouchableOpacity>
);

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
