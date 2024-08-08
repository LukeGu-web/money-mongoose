import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Calendar as CalendarView } from 'components';

export default function Calendar() {
  return (
    <View className='flex-1 gap-2 p-2 bg-white'>
      <CalendarView />
      <StatusBar style='light' />
    </View>
  );
}
