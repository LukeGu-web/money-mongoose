import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalStore } from 'core/stateHooks';
import { LoginForm, SignUpForm, Details } from 'components/AccountDetails';
import { Icon } from 'components';

export default function AccountDetails() {
  return (
    <View className='items-center justify-center flex-1 bg-white'>
      <Details />
    </View>
  );
}
