import { SplashScreen, Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useColorScheme, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { APIProvider } from 'api/api-provider';
import { Colors, useTheme } from 'core/theme';
import { Icon } from 'components';
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
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#03045E' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name='(app)' options={{ headerShown: false }} />
        <Stack.Screen name='onboarding' options={{ headerShown: false }} />
        <Stack.Screen name='agreement' options={{ headerShown: false }} />
        <Stack.Screen
          name='records/index'
          options={{
            title: 'Record list',
            headerLeft: () => <GoBack path='/' />,
            headerRight: () => (
              <TouchableOpacity>
                <Icon name='setting' size={24} color='#fff' />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name='asset/add-bank-account'
          options={{
            title: 'Add Bank Account',
            headerLeft: () => <GoBack path='/asset' />,
          }}
        />
        <Stack.Screen
          name='asset/edit-accounts'
          options={{
            title: ' Accounts',
            headerLeft: () => <GoBack path='/asset' />,
          }}
        />
      </Stack>
    </Providers>
  );
}

const GoBack = ({ path }: { path: string }) => (
  <TouchableOpacity onPress={() => router.navigate(path)}>
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
