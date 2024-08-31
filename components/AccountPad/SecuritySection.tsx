import { View, Text, Switch } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSettingStore } from 'core/stateHooks';

export default function SecuritySection() {
  const { isEnabledBlur, setIsEnabledBlur, isEnabledAuth, setIsEnabledAuth } =
    useSettingStore();
  return (
    <View className='items-start justify-center flex-1 gap-2 mb-4 '>
      <Text className='color-zinc-600'>Security</Text>
      <View className='w-full bg-blue-400 rounded-lg'>
        <View className='flex-row items-center justify-between px-4 py-2 border-b-2 border-white '>
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
