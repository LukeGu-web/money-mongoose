import { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import dayjs from 'dayjs';
import { useGetTrendDate } from 'api/record';
import { useBookStore } from 'core/stateHooks';
import { TimeframeHeader, LineChart } from 'components';
import { LineDataType, Types } from 'components/Chart/types';
import TypeSelector from 'components/Chart/TypeSelector';

export default function Trending() {
  const currentBook = useBookStore((state) => state.currentBook);
  const [type, setType] = useState<Types>(Types.EXPENSE);
  const [timeframe, setTimeframe] = useState(dayjs().format('YYYY-MM')); // year 2024 | month 2024-09 | week 2024@09
  const { data, isPending, isError } = useGetTrendDate({
    variables: {
      book_id: currentBook.id,
      type: type,
      timeframe: timeframe,
    },
  });
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['top']}
    >
      <View className='flex-1 bg-white'>
        <TimeframeHeader onChangeTimeframe={(value) => setTimeframe(value)} />
        <View className='items-center justify-center'>
          {isPending ? (
            <View className='items-center justify-center h-72'>
              <ActivityIndicator size='large' />
            </View>
          ) : (
            <LineChart data={data ?? []} type={type} />
          )}
        </View>
        <View className='items-center justify-center'>
          <TypeSelector
            Types={Types}
            type={type}
            onChangeType={(value: any) => setType(value)}
          />
        </View>
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
