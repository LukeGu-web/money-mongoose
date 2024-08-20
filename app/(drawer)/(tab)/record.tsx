import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DigitalPad, RecordCategory, RecordToolbar } from 'components';
import type { Record } from 'api/record/types';

export default function Record() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff' }}
      edges={['right', 'bottom', 'left']}
    >
      <RecordCategory />
      <RecordToolbar />
      <DigitalPad />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
