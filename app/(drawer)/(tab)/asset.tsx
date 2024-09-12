import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';

import NetAssetCard from 'components/Card/NetAssetCard';
import InfoCard from 'components/Card/InfoCard';
import AccountList from 'components/BankAccount/AccountList';
import { useGetAllAssets } from 'api/asset';
import { useBookStore } from 'core/stateHooks';

export default function Asset() {
  const currentBook = useBookStore((state) => state.currentBook);
  const { data, isPending, isError } = useGetAllAssets({
    variables: { book_id: currentBook.id },
  });
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
      }}
    >
      <View className='mb-3 h-36'>
        <NetAssetCard
          netAsset={data?.net_asset || 0}
          assets={data?.assets || 0}
          liabilities={data?.liabilities || 0}
        />
      </View>
      <View className='mb-3' style={{ height: 60 }}>
        <InfoCard />
      </View>
      <View className='flex-1 mb-4'>
        <AccountList groups={data?.groups || []} />
      </View>
      <StatusBar style='light' />
    </ScrollView>
  );
}
