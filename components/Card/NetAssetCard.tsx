import { Text, View } from 'react-native';
import { formatter } from 'core/utils';

type NetAssetCardProps = {
  netAsset: number;
  assets: number;
  liabilities: number;
};

export default function NetAssetCard({
  netAsset,
  assets,
  liabilities,
}: NetAssetCardProps) {
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
