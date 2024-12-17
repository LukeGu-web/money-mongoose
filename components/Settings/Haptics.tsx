import { View, Text, Switch } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSettingStore } from 'core/stateHooks';

export default function Haptics() {
  const { isEnableHaptic, setIsEnabledHaptic, theme } = useSettingStore();
  const switchColors =
    theme === 'dark'
      ? {
          trackColor: { false: '#334155', true: '#075985' },
          thumbColor: '#27272a',
        }
      : {
          trackColor: { false: '#cbd5e1', true: '#60a5fa' },
          thumbColor: '#f4f4f5',
        };
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
          trackColor={switchColors.trackColor}
          thumbColor={switchColors.thumbColor}
          ios_backgroundColor={switchColors.trackColor.false}
          onValueChange={() => setIsEnabledHaptic(!isEnableHaptic)}
          value={isEnableHaptic}
        />
      </View>
    </View>
  );
}
