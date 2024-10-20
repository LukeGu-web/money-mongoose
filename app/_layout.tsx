import { Pressable } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { SplashScreen, Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { initSentry, useSentryNavigationConfig } from 'core/sentry';
import { Icon, Providers } from 'components';
import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

initSentry();

function RootLayout() {
  useSentryNavigationConfig();
  const [fontsLoaded] = useFonts({
    IcoMoon: require('../assets/icomoon.ttf'),
    icon: require('../assets/icons/category/icon.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Providers>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#03045E' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
        <Stack.Screen name='user/agreement' options={{ headerShown: false }} />
        <Stack.Screen name='user/onboarding' options={{ headerShown: false }} />
        <Stack.Screen
          name='user/privacy-policy'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='user/user-agreement'
          options={{ headerShown: false }}
        />
        <Stack.Screen name='user/user-leave' options={{ headerShown: false }} />
        <Stack.Screen name='media/camera' options={{ headerShown: false }} />
        <Stack.Screen
          name='records/index'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='statistics/category'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='statistics/trending'
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
                <Icon name='left' size={24} color='white' />
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
        <Stack.Screen
          name='budget/index'
          options={{
            title: 'Budget',
            headerLeft: () => <GoBack />,
          }}
        />
        <Stack.Screen
          name='user/register'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='user/account-details'
          options={{
            title: 'Account Details',
            headerLeft: () => <GoBack />,
          }}
        />
        <Stack.Screen
          name='user/settings'
          options={{
            title: 'Settings',
            headerLeft: () => <GoBack />,
          }}
        />
        <Stack.Screen
          name='tools/tax-calculator'
          options={{
            title: 'Tax Calculator',
            headerLeft: () => <GoBack />,
          }}
        />
        <Stack.Screen
          name='tools/currency'
          options={{
            title: 'Currency Exchange',
            headerLeft: () => <GoBack />,
          }}
        />
      </Stack>
    </Providers>
  );
}

const GoBack = () => (
  <Pressable className='py-2 pr-8' onPress={() => router.back()}>
    <Icon name='left' size={24} color='white' />
  </Pressable>
);

export default Sentry.wrap(RootLayout);
