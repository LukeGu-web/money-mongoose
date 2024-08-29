import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecordList, RecordsFilter } from 'components';

export default function Records() {
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['right', 'top', 'left']}
    >
      <RecordsFilter
        search={search}
        onSetFilter={(value: string) => setFilter(value)}
        onSetSearch={(value: string) => setSearch(value)}
      />
      <RecordList extra={filter + `&search=${search}`} />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
