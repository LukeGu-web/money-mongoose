import { View, Text, Switch, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSettingStore } from 'core/stateHooks';
import Icon from '../Icon/Icon';

export default function SecuritySection() {
  const { isEnabledBlur, setIsEnabledBlur, isEnabledAuth, setIsEnabledAuth } =
    useSettingStore();

  const handleLockTime = () => {
    console.log('press lock time');
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
              <MaterialIcons
                name='screen-lock-portrait'
                size={20}
                color='white'
              />
              <Text className='color-white'>Lock in</Text>
            </View>
            <Pressable
              className='flex-row items-center justify-end flex-1'
              onPress={handleLockTime}
            >
              <Text className='color-white'>1 minute</Text>
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
    </View>
  );
}
