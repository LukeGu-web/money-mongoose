import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DigitalPad,
  RecordCategory,
  RecordToolbar,
  Transfer,
} from 'components';
import { useRecord } from 'core/stateHooks';
import { RecordTypes } from 'api/record/types';

export default function Record() {
  const { record } = useRecord();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff' }}
      edges={['right', 'bottom', 'left']}
    >
      {record.type === RecordTypes.TRANSFER ? <Transfer /> : <RecordCategory />}
      <RecordToolbar />
      <DigitalPad />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
