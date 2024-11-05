import { View, Image } from 'react-native';
import { Email } from 'components';

const avatarImage = require('../../assets/icon.png');

export default function ContactUs() {
  return (
    <View className='flex-1 w-full p-4 bg-white dark:bg-black'>
      <View className='items-center justify-center gap-4 my-12'>
        <Image className='w-32 h-32' source={avatarImage} />
      </View>
      <View className='w-full rounded-lg bg-zinc-200 dark:bg-zinc-800'>
        <Email />
      </View>
    </View>
  );
}
