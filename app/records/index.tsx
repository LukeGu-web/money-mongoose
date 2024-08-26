import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecordList } from 'components';
import RecordsFilter from 'components/ExpandView/RecordsFilter';

export default function Records() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['right', 'top', 'left']}
    >
      <RecordsFilter />
      <RecordList />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
