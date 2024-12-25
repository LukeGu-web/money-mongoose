import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PeriodBuilderForm, RecordsFilter } from 'components';

export default function PeriodBuilder() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['right', 'top', 'left']}
    >
      <PeriodBuilderForm />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
