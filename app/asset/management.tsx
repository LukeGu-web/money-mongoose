import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAsset, useSettingStore } from 'core/stateHooks';
import EditableAccountList from 'components/BankAccount/EditableAccountList';
import AssetGroupModal from 'components/Modal/AssetGroupModal';

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const resetAsset = useAsset((state) => state.resetAsset);
  const theme = useSettingStore((state) => state.theme);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme === 'dark' ? 'black' : 'white',
        padding: 8,
      }}
      edges={['bottom']}
    >
      <ScrollView>
        <EditableAccountList />
      </ScrollView>
      <View className='flex-row items-center justify-between gap-4'>
        <Pressable
          className='items-center flex-1 p-3 bg-gray-300 rounded-lg'
          onPress={() => setShowModal(true)}
        >
          <Text className='font-semibold '>Add Group</Text>
        </Pressable>
        <Pressable
          className='items-center flex-1 p-3 bg-yellow-300 rounded-lg'
          onPress={() => {
            resetAsset();
            router.push('/asset/details');
          }}
        >
          <Text className='font-semibold '>Create Account</Text>
        </Pressable>
      </View>
      <AssetGroupModal
        name=''
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
