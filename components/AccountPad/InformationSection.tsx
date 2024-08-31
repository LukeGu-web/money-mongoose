import { View, Button, Image, Text, Pressable, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function InformationSection() {
  return (
    <View className='items-start justify-center flex-1 gap-2'>
      <Text className='color-zinc-600'>Infomation</Text>
      <View className='w-full bg-blue-400 rounded-lg'>
        <Pressable className='flex-row items-center gap-2 px-4 py-2 border-b-2 border-white'>
          <AntDesign name='customerservice' size={20} color='white' />
          <Text className='text-lg color-white'>Contact Us</Text>
        </Pressable>
        <Pressable className='flex-row items-center gap-2 px-4 py-2 '>
          <AntDesign name='infocirlceo' size={20} color='white' />
          <Text className='text-lg color-white'>About</Text>
        </Pressable>
      </View>
    </View>
  );
}
