import { View } from 'react-native';
import { useGetCategoriedRecords } from 'api/record';
import { useBookStore } from 'core/stateHooks';
import Pie from 'components/Chart/Pie';

export default function CategoriedAnalysis() {
  const currentBook = useBookStore((state) => state.currentBook);
  const { data, isPending, isError } = useGetCategoriedRecords({
    variables: { book_id: currentBook.id },
  });
  console.log('CategoriedAnalysis: ', data);
  return (
    <View className='items-center justify-center flex-1 '>
      {data?.expense && (
        <Pie data={data.expense.data} total={data.expense.total_amount} />
      )}
    </View>
  );
}
