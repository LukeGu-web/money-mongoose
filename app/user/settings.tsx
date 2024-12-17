import { View } from 'react-native';
import { Currencies, Haptics } from 'components';

export default function AccountDetails() {
  return (
    <View className='flex-1 gap-4 p-2 bg-white dark:bg-black'>
      <Currencies />
      <Haptics />
    </View>
  );
}
