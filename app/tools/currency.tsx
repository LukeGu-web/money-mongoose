import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CurrencyConvertor from 'components/Currency/CurrencyConvertor';

export default function Currency() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className='items-center justify-center flex-1 w-full p-2 bg-white'>
        <CurrencyConvertor />
      </View>
    </TouchableWithoutFeedback>
  );
}
