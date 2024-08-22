import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { View, Button, Image, Text } from 'react-native';
import { clearAll } from 'core/localStorage/storage';
import { useLocalStore, useRecordStore } from 'core/stateHooks';

const avatarImage = require('../../../assets/icon.png');

export default function Account() {
  const reset = useLocalStore((state) => state.reset);
  // const setToken = useLocalStore((state) => state.setToken);
  const resetRecords = useRecordStore((state) => state.resetRecords);
  return (
    <View className='flex-1 p-2 bg-white'>
      <View className='flex-row items-center gap-4 p-4 rounded-lg bg-sky-200'>
        <Image source={avatarImage} className='w-24 h-24' />
        <Text className='text-lg font-bold color-zinc-700'>Luke</Text>
      </View>
      <View></View>
      <View className='items-start justify-center flex-1 '>
        <Button onPress={clearAll} title='Clear all keys' />
        <Button onPress={reset} title='Reset local store' />
        <Button onPress={resetRecords} title='Reset records store' />
      </View>
      <StatusBar style='light' />
    </View>
  );
}
