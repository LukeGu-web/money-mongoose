import { useRef } from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSettingStore } from 'core/stateHooks';
import Icon from '../Icon/Icon';
import LockTimeBottomSheet from 'components/BottomSheet/LockTimeBottomSheet';

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
  const switchColors =
    theme === 'dark'
      ? {
          trackColor: { false: '#334155', true: '#075985' },
          thumbColor: '#27272a',
        }
      : {
          trackColor: { false: '#cbd5e1', true: '#60a5fa' },
          thumbColor: '#fff',
        };

  const handleLockTime = () => {
    bottomSheetModalRef.current?.present();
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
          <Switch
            trackColor={switchColors.trackColor}
            thumbColor={switchColors.thumbColor}
            ios_backgroundColor={switchColors.trackColor.false}
            onValueChange={(e) => setIsEnabledAuth(!isEnabledAuth)}
            value={isEnabledAuth}
          />
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
            trackColor={switchColors.trackColor}
            thumbColor={switchColors.thumbColor}
            ios_backgroundColor={switchColors.trackColor.false}
            onValueChange={() => setIsEnabledBlur(!isEnabledBlur)}
            value={isEnabledBlur}
          />
        </View>
      </View>
      <LockTimeBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}
