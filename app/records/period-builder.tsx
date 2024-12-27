import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettingStore } from 'core/stateHooks';
import { PeriodBuilderForm } from 'components';

export default function PeriodBuilder() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme === 'dark' ? 'black' : 'white' }}
      edges={['bottom']}
    >
      <PeriodBuilderForm />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
