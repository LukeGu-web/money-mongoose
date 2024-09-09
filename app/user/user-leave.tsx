import { View, Image } from 'react-native';
const leafImage = require('../../assets/leaf.jpg');

export default function UserAgreement() {
  return (
    <View className='items-center justify-center flex-1 bg-white'>
      <Image className='w-4/5 h-4/5' source={leafImage} />
    </View>
  );
}
