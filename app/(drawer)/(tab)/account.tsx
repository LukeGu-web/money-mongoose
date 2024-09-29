import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSettingStore } from 'core/stateHooks';
import { clearAll } from 'core/localStorage/storage';
import {
  AvatarSection,
  AccountPad,
  DetailsSection,
  SecuritySection,
  InformationSection,
} from 'components/AccountSections';

export default function Account() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 8,
        backgroundColor: theme === 'dark' ? 'black' : 'white',
      }}
    >
      <AvatarSection />
      <View className='gap-2 mb-4'>
        <Text className='color-zinc-600 dark:color-zinc-300'>Tools</Text>
        <AccountPad />
      </View>
      <DetailsSection />
      <SecuritySection />
      <InformationSection />
      {/* <View className='items-start justify-center flex-1 gap-2 mt-4'>
        <Text className='color-zinc-600 dark:color-zinc-300'>Debug</Text>
        <Pressable
          className='flex-row items-center w-full gap-2 px-4 py-2 bg-blue-400 rounded-lg dark:bg-blue-800'
          onPress={clearAll}
        >
          <MaterialIcons name='cleaning-services' size={20} color='white' />
          <Text className='text-lg color-white'>Clean all data</Text>
        </Pressable>
      </View> */}
      <StatusBar style='light' />
    </ScrollView>
  );
}
