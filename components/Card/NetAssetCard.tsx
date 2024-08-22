import { Text, View } from 'react-native';
import { useBookStore } from 'core/stateHooks';
import { formatter, calculateAssets } from 'core/utils';
import { BookType } from 'api/types';

export default function NetAssetCard() {
  const { getCurrentBook } = useBookStore();
  const [netAsset, assets, liabilities] = calculateAssets(
    getCurrentBook() as BookType
  );
  return (
    <View className='justify-between flex-1 p-3 bg-teal-100 rounded-lg'>
      <Text className='text-2xl'>Net Asset</Text>
      <Text className='text-4xl'>{formatter(netAsset)}</Text>
      <View className='flex-row gap-2'>
        <Text className='font-extrabold'>Assets</Text>
        <Text>{formatter(assets)}</Text>
        <Text className='font-extrabold'>Liabilities</Text>
        <Text>
          {liabilities > 0 && '-'}
          {formatter(liabilities)}
        </Text>
      </View>
    </View>
  );
}
