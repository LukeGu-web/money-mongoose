import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PeriodBuilderForm, RecordsFilter } from 'components';

export default function PeriodList() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['right', 'top', 'left']}
    >
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
