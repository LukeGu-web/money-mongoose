import { StatusBar } from 'expo-status-bar';
import { useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecordList, RecordsFilter } from 'components';

export default function Records() {
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const extra = useMemo(() => {
    return filter + `&search=${search}`;
  }, [filter, search]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['right', 'top', 'left']}
    >
      <RecordsFilter
        search={search}
        onSetFilter={setFilter}
        onSetSearch={setSearch}
      />
      <RecordList key={extra} extra={extra} />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
