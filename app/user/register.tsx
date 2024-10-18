import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettingStore } from 'core/stateHooks';
import { LoginForm, SignUpForm, Details } from 'components/AccountDetails';
import { Icon } from 'components';

export default function Register() {
  const params = useLocalSearchParams();
  const theme = useSettingStore((state) => state.theme);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme === 'dark' ? 'black' : 'white' }}
      edges={['right', 'top', 'left']}
    >
      <View className='px-4 bg-white dark:bg-black'>
        <Pressable
          className='flex-row items-center gap-2 py-2'
          onPress={() => router.back()}
        >
          <Icon
            name='left'
            size={20}
            color={theme === 'dark' ? '#dbeafe' : '#03045E'}
          />
          <Text className='color-primary dark:color-blue-100'>Back</Text>
        </Pressable>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='items-center justify-center flex-1 bg-white dark:bg-black'>
          {params.reason === 'login' && <LoginForm />}
          {params.reason === 'sign-up' && <SignUpForm />}
          {params.reason === 'details' && <Details />}
        </View>
      </TouchableWithoutFeedback>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}
