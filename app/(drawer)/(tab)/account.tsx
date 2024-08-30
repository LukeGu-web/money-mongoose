import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, Pressable, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { clearAll } from 'core/localStorage/storage';
import { AccountPad } from 'components';
import InformationSection from 'components/AccountPad/InformationSection';

const avatarImage = require('../../../assets/icon.png');

export default function Account() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
      }}
    >
      <View className='flex-row items-center gap-4 p-6 mb-4 rounded-lg bg-sky-200'>
        <Pressable className='rounded-full bg-zinc-400'>
          <Image source={avatarImage} className='w-20 h-20' />
        </Pressable>
        <Text className='text-lg font-bold color-zinc-700'>Luke</Text>
      </View>
      <View className='gap-2 mb-4'>
        <Text className='color-zinc-600'>Tools</Text>
        <AccountPad />
      </View>
      <View className='items-start justify-center flex-1 gap-2 mb-4'>
        <Text className='color-zinc-600'>Account</Text>
        <Pressable className='flex-row items-center w-full gap-2 px-4 py-2 bg-blue-400 rounded-lg'>
          <MaterialCommunityIcons
            name='card-account-details-outline'
            size={20}
            color='white'
          />
          <Text className='text-lg color-white'>Account Details</Text>
        </Pressable>
      </View>
      <View className='items-start justify-center flex-1 gap-2 mb-4'>
        <Text className='color-zinc-600'>Security</Text>
        <View className='w-full bg-blue-400 rounded-lg'>
          <Pressable className='flex-row items-center gap-2 px-4 py-2 border-b-2 border-white'>
            <Ionicons name='finger-print' size={20} color='white' />
            <Text className='text-lg color-white'>FaceID/Fingerpint</Text>
          </Pressable>
          <Pressable className='flex-row items-center gap-2 px-4 py-2 border-b-2 border-white'>
            <MaterialIcons name='blur-on' size={20} color='white' />
            <Text className='text-lg color-white'>Background Blur</Text>
          </Pressable>
        </View>
      </View>
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
