import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { GeneratedRecordList } from 'components';

export default function PeriodGeneratedRecords() {
  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <GeneratedRecordList />
      <StatusBar style='light' />
    </View>
  );
}
