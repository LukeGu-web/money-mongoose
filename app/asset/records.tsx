import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useAsset } from 'core/stateHooks';
import { RecordList } from 'components';

export default function Records() {
  const { asset } = useAsset();
  return (
    <ScrollView className='flex-1 p-2 dark:bg-zinc-600'>
      <View className='items-start gap-4 p-4 mb-4 rounded-lg bg-sky-200 dark:bg-sky-900'>
        <Text className='text-2xl font-bold color-zinc-700 dark:color-zinc-200'>
          {asset.name}
        </Text>
        <Text className='text-lg dark:color-white'>
          Balance: {asset.balance}
        </Text>
      </View>
      <View className='flex-1 rounded-lg'>
        <RecordList extra={`&asset=${asset.id}`} />
      </View>
      <StatusBar style='light' />
    </ScrollView>
  );
}
