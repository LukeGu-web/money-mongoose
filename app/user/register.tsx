import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <View className='flex-1'>
      <ImageBackground
        className='flex-1'
        source={theme === 'dark' ? bgImageDark : bgImage}
      >
        <BlurView className='flex-1' intensity={30} tint={theme}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor:
                params.reason === 'details'
                  ? theme === 'dark'
                    ? 'black'
                    : 'white'
                  : 'transparent',
            }}
            edges={['right', 'top', 'left']}
          >
            <ScrollView className='flex-1'>
              <View className='px-4'>
                <Pressable
                  className='flex-row items-center gap-2 py-2'
                  onPress={() => router.back()}
                >
                  <Icon
                    name='left'
                    size={20}
                    color={theme === 'dark' ? '#dbeafe' : '#03045E'}
                  />
                  <Text className='color-primary dark:color-blue-100'>
                    Back
                  </Text>
                </Pressable>
              </View>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className='items-center justify-center flex-1'>
                  {params.reason === 'login' && <LoginForm />}
                  {params.reason === 'sign-up' && <SignUpForm />}
                  {params.reason === 'details' && <Details />}
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          </SafeAreaView>
        </BlurView>
      </ImageBackground>
    </View>
  );
}
