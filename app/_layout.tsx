import { useEffect } from 'react';
import { Pressable } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { isRunningInExpoGo } from 'expo';
import {
  SplashScreen,
  Stack,
  router,
  Slot,
  useNavigationContainerRef,
} from 'expo-router';
import { useFonts } from 'expo-font';
import { Icon, Providers } from 'components';
import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: 'https://4d6698e27f8c85e7f0a2162b49dee3cb@o4508129228226560.ingest.us.sentry.io/4508129275019264',
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      enableNativeFramesTracking: !isRunningInExpoGo(),
      // ...
    }),
  ],
});

function RootLayout() {
  // Capture the NavigationContainer ref and register it with the instrumentation.
  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);
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
          headerTintColor: '#fff',
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
    <Icon name='left' size={24} color='#fff' />
  </Pressable>
);

export default Sentry.wrap(RootLayout);
