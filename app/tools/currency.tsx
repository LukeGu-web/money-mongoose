import { View, Text, Button } from 'react-native';
import CurrencyConvertor from 'components/Currency/CurrencyConvertor';

export default function Currency() {
  return (
    <View className='items-center justify-center flex-1 w-full p-2 bg-white'>
      <CurrencyConvertor />
    </View>
  );
}
