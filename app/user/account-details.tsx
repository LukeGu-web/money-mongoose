import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { useLocalStore } from 'core/stateHooks';
import { LoginForm, SignUpForm, Details } from 'components/AccountDetails';

export default function AccountDetails() {
  const params = useLocalSearchParams();
  return (
    <View className='items-center justify-center flex-1 bg-white'>
      {params.reason === 'login' && <LoginForm />}
      {params.reason === 'sign-up' && <SignUpForm />}
      {params.reason === 'details' && <Details />}
    </View>
  );
}
