import { SplashScreen, Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { Pressable } from 'react-native';
import { Icon, Providers } from 'components';
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
      </Stack>
    </Providers>
  );
}

const GoBack = () => (
  <Pressable className='py-2 pr-8' onPress={() => router.back()}>
    <Icon name='left' size={24} color='#fff' />
  </Pressable>
);
