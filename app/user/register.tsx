import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import { BlurView } from 'expo-blur';
import { useSettingStore } from 'core/stateHooks';
import { LoginForm, SignUpForm, Details } from 'components/AccountDetails';
import { Icon } from 'components';
const bgImage = require('../../assets/bg-image.jpg');
const bgImageDark = require('../../assets/bg-image-dark.jpg');

export default function Register() {
  const params = useLocalSearchParams();
  const theme = useSettingStore((state) => state.theme);
  return (
    <ImageBackground
      className='flex-1'
      source={theme === 'dark' ? bgImageDark : bgImage}
    >
      <BlurView className='flex-1' intensity={30} tint={theme}>
        <View className='px-4 mt-6'>
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
        <KeyboardAwareScrollView bottomOffset={66}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='items-center justify-center flex-1'>
              {params.reason === 'login' && <LoginForm />}
              {params.reason === 'sign-up' && <SignUpForm />}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
        <KeyboardToolbar />
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      </BlurView>
    </ImageBackground>
  );
}
