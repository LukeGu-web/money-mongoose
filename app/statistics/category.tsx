import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import dayjs from 'dayjs';
import { useGetCategoriedRecords } from 'api/record';
import { useBookStore } from 'core/stateHooks';
import { TimeframeHeader, PieChart } from 'components';
import { Types } from 'components/Chart/Pie';

export default function CategoriedAnalysis() {
  const [timeframe, setTimeframe] = useState(dayjs().format('YYYY-MM')); // year 2024 | month 2024-09 | week 2024@09
  const [type, setType] = useState<Types>(Types.EXPENSE);
  const currentBook = useBookStore((state) => state.currentBook);
  const { data } = useGetCategoriedRecords({
    variables: { book_id: currentBook.id, type: type, timeframe: timeframe },
  });
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['top']}
    >
      <View className='flex-1 bg-white dark:bg-black'>
        <TimeframeHeader onChangeTimeframe={(value) => setTimeframe(value)} />
        <View className='items-center justify-center flex-1 p-2 bg-white dark:bg-black'>
          {!data ? (
            <View className='items-center justify-center flex-1 '>
              <ActivityIndicator size='large' />
            </View>
          ) : (
            <PieChart
              data={data.data}
              details={data.details}
              total={data.total_amount}
              type={type}
              onChangeType={(value: any) => setType(value)}
            />
          )}
        </View>
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
