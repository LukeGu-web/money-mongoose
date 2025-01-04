import { View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSettingStore } from 'core/stateHooks';
import Switch from '../Switch/Switch';

export default function Haptics() {
  const { isEnableHaptic, setIsEnabledHaptic, theme } = useSettingStore();
  return (
    <View className='gap-2'>
      <Text className='color-zinc-600 dark:color-zinc-300'>
        Haptic Feedback
      </Text>
      <View className='flex-row items-center justify-between gap-2 px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800'>
        <View className='flex-row items-center gap-2'>
          <MaterialIcons
            name='vibration'
            size={20}
            color={theme === 'dark' ? 'white' : 'black'}
          />
          <Text className='text-lg dark:color-white'>Keypad</Text>
        </View>
        <Switch
          onValueChange={() => setIsEnabledHaptic(!isEnableHaptic)}
          value={isEnableHaptic}
        />
      </View>
    </View>
  );
}
