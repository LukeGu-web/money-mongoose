import { View } from 'react-native';
import { useGetTrendDate } from 'api/record';
import { useBookStore } from 'core/stateHooks';
// import Line from 'components/Chart/Line';
import Line from 'components/Chart/Line';

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
    <View className='items-center justify-center flex-1 '>
      {data && data.length > 0 && <Line data={data} />}
    </View>
  );
}
