import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useGetTrendDate } from 'api/record';
import { useBookStore } from 'core/stateHooks';
import { TimeframeHeader, LineChart } from 'components';

export default function UserAgreement() {
  const currentBook = useBookStore((state) => state.currentBook);
  const { data, isPending, isError } = useGetTrendDate({
    variables: {
      book_id: currentBook.id,
      type: 'expense',
      time_frame: '2024-09',
    },
  });
  console.log('data: ', data);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['top']}
    >
      <TimeframeHeader />
      <View className='items-center justify-center flex-1 '>
        {data && data.length > 0 && <LineChart data={data} />}
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
