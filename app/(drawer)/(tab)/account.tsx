import { StatusBar } from 'expo-status-bar';
import { View, Button, Image, Text, ScrollView } from 'react-native';
import { clearAll } from 'core/localStorage/storage';
import { useLocalStore, useRecordStore } from 'core/stateHooks';
import { AccountPad } from 'components';

const avatarImage = require('../../../assets/icon.png');

export default function Account() {
  const reset = useLocalStore((state) => state.reset);
  // const setToken = useLocalStore((state) => state.setToken);
  const resetRecords = useRecordStore((state) => state.resetRecords);
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
      }}
    >
      <View className='flex-row items-center gap-4 p-4 mb-4 rounded-lg bg-sky-200'>
        <Image source={avatarImage} className='w-24 h-24' />
        <Text className='text-lg font-bold color-zinc-700'>Luke</Text>
      </View>
      <View className='mb-4'>
        <Text>Tools</Text>
        <AccountPad />
      </View>
      <View className='items-start justify-center flex-1 '>
        <Text>Debug</Text>
        <Button onPress={clearAll} title='Clear all keys' />
        <Button onPress={reset} title='Reset local store' />
        <Button onPress={resetRecords} title='Reset records store' />
      </View>
      <StatusBar style='light' />
    </ScrollView>
  );
}
