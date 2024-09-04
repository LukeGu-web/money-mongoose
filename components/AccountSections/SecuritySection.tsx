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
  } = useSettingStore();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleLockTime = () => {
    bottomSheetModalRef.current?.present();
  };
  return (
    <View className='items-start justify-center flex-1 gap-2 mb-4 '>
      <Text className='color-zinc-600'>Security</Text>
      <View className='w-full bg-blue-400 rounded-lg'>
        <View
          className={`flex-row items-center justify-between px-4 py-2 ${
            !isEnabledAuth && 'border-b-2 border-white'
          }`}
        >
          <View className='flex-row items-center gap-2'>
            <Ionicons name='finger-print' size={20} color='white' />
            <Text className='text-lg color-white'>FaceID/Fingerpint</Text>
          </View>
          <Switch
            trackColor={{ false: '#cbd5e1', true: '#fbbf24' }}
            ios_backgroundColor='#cbd5e1'
            onValueChange={(e) => setIsEnabledAuth(!isEnabledAuth)}
            value={isEnabledAuth}
          />
        </View>
        {isEnabledAuth && (
          <View className='flex-row items-center justify-between px-4 py-3 bg-blue-900 border-b-2 border-white border-x-2'>
            <View className='flex-row items-center gap-2'>
              <MaterialIcons name='lock-clock' size={20} color='white' />
              <Text className='color-white'>Lock in</Text>
            </View>
            <Pressable
              className='flex-row items-center justify-end flex-1'
              onPress={handleLockTime}
            >
              <Text className='color-white'>
                {lockTime} minute{lockTime > 1 ? 's' : ''}
              </Text>
              <Icon name='arrow-right' size={18} color='#fff' />
            </Pressable>
          </View>
        )}
        <View className='flex-row items-center justify-between gap-2 px-4 py-2'>
          <View className='flex-row items-center gap-2'>
            <MaterialIcons name='blur-on' size={20} color='white' />
            <Text className='text-lg color-white'>Background Blur</Text>
          </View>
          <Switch
            trackColor={{ false: '#cbd5e1', true: '#fbbf24' }}
            ios_backgroundColor='#cbd5e1'
            onValueChange={() => setIsEnabledBlur(!isEnabledBlur)}
            value={isEnabledBlur}
          />
        </View>
      </View>
      <LockTimeBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}