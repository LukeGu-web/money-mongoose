import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalStore } from 'core/stateHooks';
import { LoginForm, SignUpForm, Details } from 'components/AccountDetails';
import { Icon } from 'components';

export default function AccountDetails() {
  const params = useLocalSearchParams();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['right', 'top', 'left']}
    >
      <View className='px-4 py-2 bg-white'>
        <Pressable
          className='flex-row items-center gap-2 py-2'
          onPress={() => router.back()}
        >
          <Icon name='left' size={20} color='#03045E' />
          <Text className='color-primary'>Back</Text>
        </Pressable>
      </View>
      <View className='items-center justify-center flex-1 bg-white'>
        {params.reason === 'login' && <LoginForm />}
        {params.reason === 'sign-up' && <SignUpForm />}
        {params.reason === 'details' && <Details />}
      </View>
    </SafeAreaView>
  );
}
