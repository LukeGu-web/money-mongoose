import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { View, Button } from 'react-native';
import { clearAll } from 'core/localStorage/storage';
import { useLocalStore, useRecordStore } from 'core/stateHooks';

export default function Account() {
  const reset = useLocalStore((state) => state.reset);
  const setToken = useLocalStore((state) => state.setToken);
  const resetRecords = useRecordStore((state) => state.resetRecords);
  return (
    <View className='items-center justify-center flex-1 bg-white'>
      {/* <Button onPress={getAllKeys} title='Get all keys' /> */}

      <Button onPress={clearAll} title='Clear all keys' />
      <Button
        onPress={() => setToken('dd62303261c21c234bc49119a9f8ef613684e64e')}
        title='Use demo user'
      />
      <Button onPress={reset} title='Reset local store' />
      <Button onPress={resetRecords} title='Reset records store' />
      <Link href='/test'>Test</Link>
      <StatusBar style='light' />
    </View>
  );
}
