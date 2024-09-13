import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useGetCategoriedRecords } from 'api/record';
import { useBookStore } from 'core/stateHooks';
import { TimeframeHeader, PieChart } from 'components';

export default function CategoriedAnalysis() {
  const currentBook = useBookStore((state) => state.currentBook);
  const { data } = useGetCategoriedRecords({
    variables: { book_id: currentBook.id },
  });
  console.log('CategoriedAnalysis: ', data);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['top']}
    >
      <TimeframeHeader />
      <View className='items-center justify-center flex-1 p-2 bg-white'>
        {!data?.expense ? (
          <View className='items-center justify-center flex-1 '>
            <ActivityIndicator size='large' />
          </View>
        ) : (
          <PieChart
            data={data.expense.data}
            total={data.expense.total_amount}
          />
        )}
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
