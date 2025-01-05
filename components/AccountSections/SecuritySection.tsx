import { useRef } from 'react';
import { Alert, View, Text, Linking, Pressable } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSettingStore } from 'core/stateHooks';
import Icon from '../Icon/Icon';
import LockTimeBottomSheet from '../BottomSheet/LockTimeBottomSheet';
import Switch from '../Switch/Switch';

export default function SecuritySection() {
  const {
    isEnabledBlur,
    setIsEnabledBlur,
    isEnabledAuth,
    setIsEnabledAuth,
    lockTime,
    theme,
  } = useSettingStore();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleLockTime = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleToggleFaceID = async () => {
    if (!isEnabledAuth) {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        return Alert.alert(
          'Authentication Permission',
          `This app needs permission to access your Face ID to protect your data.\n\nTo enable Face ID:\n\n1. Click 'Go to Settings'\n2. Toggle Face ID`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'Go to Settings', onPress: () => Linking.openSettings() },
          ]
        );
      } else {
        setIsEnabledAuth(true);
      }
    } else {
      setIsEnabledAuth(false);
    }
  };

  return (
    <View className='items-start justify-center flex-1 gap-2 mb-4 '>
      <Text className='color-zinc-600 dark:color-zinc-300'>Security</Text>
      <View className='w-full rounded-lg bg-zinc-200 dark:bg-zinc-800'>
        <View
          className={`flex-row items-center justify-between px-4 py-2 ${
            !isEnabledAuth && 'border-b-2 border-white dark:border-black'
          }`}
        >
          <View className='flex-row items-center gap-2'>
            <Ionicons
              name='finger-print'
              size={20}
              color={theme === 'dark' ? 'white' : 'black'}
            />
            <Text className='text-lg dark:color-white'>FaceID/Fingerpint</Text>
          </View>
          <Switch onValueChange={handleToggleFaceID} value={isEnabledAuth} />
        </View>
        {isEnabledAuth && (
          <View className='flex-row items-center justify-between px-4 py-3 border-b-2 border-white dark:border-black bg-zinc-300 dark:bg-zinc-900 border-x-2'>
            <View className='flex-row items-center gap-2'>
              <MaterialIcons
                name='lock-clock'
                size={20}
                color={theme === 'dark' ? 'white' : 'black'}
              />
              <Text className='dark:color-white'>Lock in</Text>
            </View>
            <Pressable
              className='flex-row items-center justify-end flex-1'
              onPress={handleLockTime}
            >
              <Text className='dark:color-white'>
                {lockTime} minute{lockTime > 1 ? 's' : ''}
              </Text>
              <Icon
                name='arrow-right'
                size={18}
                color={theme === 'dark' ? 'white' : 'black'}
              />
            </Pressable>
          </View>
        )}
        <View className='flex-row items-center justify-between gap-2 px-4 py-2'>
          <View className='flex-row items-center gap-2'>
            <MaterialIcons
              name='blur-on'
              size={20}
              color={theme === 'dark' ? 'white' : 'black'}
            />
            <Text className='text-lg dark:color-white'>Background Blur</Text>
          </View>
          <Switch
            onValueChange={() => setIsEnabledBlur(!isEnabledBlur)}
            value={isEnabledBlur}
          />
        </View>
      </View>
      <LockTimeBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}
