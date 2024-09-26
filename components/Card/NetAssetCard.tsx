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
    <View className='justify-between flex-1 p-3 bg-teal-100 rounded-lg dark:bg-teal-900'>
      <Text className='text-2xl dark:color-white'>Net Asset</Text>
      <Text className='text-4xl dark:color-white'>{formatter(netAsset)}</Text>
      <View className='flex-row gap-2'>
        <Text className='font-extrabold dark:color-white'>Assets</Text>
        <Text className='dark:color-white'>{formatter(assets)}</Text>
        <Text className='font-extrabold dark:color-white'>Liabilities</Text>
        <Text className='dark:color-white'>
          {liabilities > 0 && '-'}
          {formatter(Math.abs(liabilities))}
        </Text>
      </View>
    </View>
  );
}
