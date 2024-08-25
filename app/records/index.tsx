import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RecordList } from 'components';
import RecordsFilter from 'components/ExpandView/RecordsFilter';

export default function Records() {
  return (
    <View className='flex-1 p-2'>
      <RecordsFilter />
      <RecordList />
      <StatusBar style='light' />
    </View>
  );
}
