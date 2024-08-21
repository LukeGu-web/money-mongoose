import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';

import NetAssetCard from 'components/Card/NetAssetCard';
import InfoCard from 'components/Card/InfoCard';
import AccountList from 'components/BankAccount/AccountList';

export default function Asset() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
      }}
    >
      <View className='mb-3 h-36'>
        <NetAssetCard />
      </View>
      <View className='mb-3' style={{ height: 60 }}>
        <InfoCard />
      </View>
      <View className='flex-1 mb-4'>
        <AccountList />
      </View>
      <StatusBar style='light' />
    </ScrollView>
  );
}
