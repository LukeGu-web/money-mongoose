import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useGetCategoriedRecords } from 'api/record';
import { useBookStore } from 'core/stateHooks';
import { TimeframeHeader, PieChart } from 'components';

export default function CategoriedAnalysis() {
  const [timeframe, setTimeframe] = useState(''); // year 2024 | month 2024-09 | week 2024@09
  const currentBook = useBookStore((state) => state.currentBook);
  const { data } = useGetCategoriedRecords({
    variables: { book_id: currentBook.id },
  });
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['top']}
    >
      <View className='flex-1 bg-white'>
        <TimeframeHeader onChangeTimeframe={(value) => setTimeframe(value)} />
        <View className='items-center justify-center flex-1 p-2 bg-white'>
          {!data?.expense ? (
            <View className='items-center justify-center flex-1 '>
              <ActivityIndicator size='large' />
            </View>
          ) : (
            <PieChart
              data={data.expense.data}
              details={data.expense.details}
              total={data.expense.total_amount}
            />
          )}
        </View>
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
