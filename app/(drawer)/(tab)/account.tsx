import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, ScrollView } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { clearAll } from 'core/localStorage/storage';
import {
  AvatarSection,
  AccountPad,
  DetailsSection,
  SecuritySection,
  InformationSection,
} from 'components/AccountSections';

export default function Account() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
      }}
    >
      <AvatarSection />
      <View className='gap-2 mb-4'>
        <Text className='color-zinc-600'>Tools</Text>
        <AccountPad />
      </View>
      <DetailsSection />
      <SecuritySection />
      <InformationSection />
      <View className='items-start justify-center flex-1 gap-2 mt-4'>
        <Text className='color-zinc-600'>Debug</Text>
        <Pressable
          className='flex-row items-center w-full gap-2 px-4 py-2 bg-blue-400 rounded-lg'
          onPress={clearAll}
        >
          <MaterialIcons name='cleaning-services' size={20} color='white' />
          <Text className='text-lg color-white'>Clean all data</Text>
        </Pressable>
      </View>
      <StatusBar style='light' />
    </ScrollView>
  );
}
