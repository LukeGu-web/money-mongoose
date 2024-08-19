import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';

import NetAssetCard from 'components/Card/NetAssetCard';
import InfoCard from 'components/Card/InfoCard';
import AccountList from 'components/BankAccount/AccountList';

export default function Asset() {
  return (
    <ScrollView className='flex-1 p-2 bg-white'>
      <View className='h-40 mb-3 rounded-lg bg-cyan-100'>
        <NetAssetCard />
      </View>
      <View className='mb-3 h-18'>
        <InfoCard />
      </View>
      <View className='flex-1 mb-4'>
        <AccountList />
      </View>
      <StatusBar style='light' />
    </ScrollView>
  );
}
