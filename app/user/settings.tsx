import { View } from 'react-native';
import { Currencies } from 'components';

export default function AccountDetails() {
  return (
    <View className='flex-1 p-2 bg-white dark:bg-black'>
      <Currencies />
    </View>
  );
}
