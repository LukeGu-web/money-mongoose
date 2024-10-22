import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useSettingStore } from 'core/stateHooks';

export default function ThirdPartyLogin() {
  const theme = useSettingStore((state) => state.theme);
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      iosClientId:
        '398690312031-t4mgj90qn7gb5k7lmpvotlr77bga0ntp.apps.googleusercontent.com',
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  });

  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  const signIn = async () => {
    console.log('Pressed sign in');

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // setUserInfo(userInfo);
      // setError(null);
    } catch (e) {
      // setError(e);
    }
  };

  // const logout = () => {
  //   setUserInfo(undefined);
  //   GoogleSignin.revokeAccess();
  //   GoogleSignin.signOut();
  // };

  return (
    <View>
      <Text className='self-center color-gray-400'>
        ----------- or -----------
      </Text>
      <View className='gap-3 mt-4'>
        {/* <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6
              name='google'
              size={20}
              color={theme === 'dark' ? '#dbeafe' : '#03045E'}
            />
          </View>
          <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
            Continue with Google
          </Text>
        </Pressable> */}
        <View className='self-center w-3/4 border-2 border-gray-400 rounded-lg'>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={
              theme === 'dark'
                ? GoogleSigninButton.Color.Dark
                : GoogleSigninButton.Color.Light
            }
            style={{
              width: '100%',
            }}
            onPress={signIn}
          />
        </View>

        <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6
              name='meta'
              size={20}
              color={theme === 'dark' ? '#dbeafe' : '#03045E'}
            />
          </View>
          <Text className='w-3/4 text-lg font-semibold color-primary dark:color-blue-100'>
            Continue with Meta
          </Text>
        </Pressable>
        <Pressable className='flex-row items-center self-center w-3/4 gap-4 px-4 py-2 border-2 border-gray-400 rounded-lg'>
          <View className='items-center w-1/6'>
            <FontAwesome6
              name='apple'
              size={24}
              color={theme === 'dark' ? 'white' : 'black'}
            />
          </View>
          <Text className='text-lg font-semibold color-primary dark:color-blue-100'>
            Continue with Apple
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
