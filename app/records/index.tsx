import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RecordList } from 'components';

export default function Records() {
  return (
    <View className='flex-1 p-2'>
      <RecordList />
      <StatusBar style='light' />
    </View>
  );
}
