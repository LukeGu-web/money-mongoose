import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useSettingStore } from 'core/stateHooks';
import { PeriodBuilderForm } from 'components';

export default function PeriodBuilder() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <PeriodBuilderForm />
      <StatusBar style='light' />
    </View>
  );
}
