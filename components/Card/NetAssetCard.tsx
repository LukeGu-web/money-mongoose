import { Text, View } from 'react-native';
import { useBookStore } from 'core/stateHooks';
import { formatter } from 'core/utils';
import { BookType } from 'api/types';

export default function NetAssetCard() {
  const { getCurrentBook } = useBookStore();
  const netAsset = (getCurrentBook() as BookType).groups
    .map((group) =>
      group.assets.reduce((sum, item) => sum + Number(item.balance), 0)
    )
    .reduce((sum, item) => sum + item, 0);

  return (
    <View className='justify-between flex-1 p-3 bg-teal-100 rounded-lg'>
      <Text className='text-2xl'>Net Asset</Text>
      <Text className='text-4xl'>{formatter(netAsset)}</Text>
      <View className='flex-row gap-2'>
        <Text className='font-extrabold'>Assets</Text>
        <Text>{formatter(netAsset)}</Text>
        <Text className='font-extrabold'>Liabilities</Text>
        <Text>0.00</Text>
      </View>
    </View>
  );
}
