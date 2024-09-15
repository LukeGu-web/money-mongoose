import { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import dayjs, { Dayjs } from 'dayjs';
import { useGetTrendDate } from 'api/record';
import { useBookStore } from 'core/stateHooks';
import { TimeframeHeader, LineChart } from 'components';
import { LineDataType, Types } from 'components/Chart/types';

export default function UserAgreement() {
  const currentBook = useBookStore((state) => state.currentBook);
  const [type, setType] = useState<Types>(Types.EXPENSE);
  const [timeframe, setTimeframe] = useState(dayjs().format('YYYY-MM')); // year 2024 | month 2024-09 | week 2024@09
  const { data, isPending, isError } = useGetTrendDate({
    variables: {
      book_id: currentBook.id,
      type: type,
      time_frame: timeframe,
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
            <LineChart data={data as LineDataType[]} type={type} />
          )}
        </View>
        <View className='items-center justify-center'>
          <View className='flex-row items-center border-2 rounded-lg border-slate-800'>
            {Object.values(Types).map((item, index) => (
              <Pressable
                key={item}
                className={`items-center justify-center py-1 px-2 border-slate-800 ${
                  index < 2 && 'border-r-2'
                } ${type === item && 'bg-slate-800'}`}
                onPress={() => setType(item)}
              >
                <Text
                  className={`text-center font-medium ${
                    type === item ? 'color-white' : 'color-slate-800'
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
