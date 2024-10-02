import { View } from 'react-native';
import { Details } from 'components/AccountDetails';

export default function AccountDetails() {
  return (
    <View className='items-center justify-center flex-1 bg-white dark:bg-black'>
      <Details />
    </View>
  );
}
