import { View } from 'react-native';
import { useGetCategoriedRecords } from 'api/record';
import Pie from 'components/Chart/Pie';

export default function UserAgreement() {
  const { data, isPending, isError } = useGetCategoriedRecords();
  console.log('data: ', data);
  return (
    <View className='items-center justify-center flex-1 '>
      {data?.expense && (
        <Pie data={data.expense.data} total={data.expense.total_amount} />
      )}
    </View>
  );
}
