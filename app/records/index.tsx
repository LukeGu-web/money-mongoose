import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecordList, RecordsFilter } from 'components';

export default function Records() {
  const [extra, setExtra] = useState<string>('');
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['right', 'top', 'left']}
    >
      <RecordsFilter onSetFilter={(value: string) => setExtra(value)} />
      <RecordList extra={extra} />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
