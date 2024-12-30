import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ScheduledRecordList } from 'components';

export default function PeriodList() {
  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <ScheduledRecordList />
      <StatusBar style='light' />
    </View>
  );
}
