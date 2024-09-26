import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Calendar as CalendarView } from 'components';

export default function Calendar() {
  return (
    <View className='flex-1 p-2 bg-white dark:bg-black'>
      <CalendarView />
      <StatusBar style='light' />
    </View>
  );
}
