import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TaxCalculator from 'components/TaxCalculator/Calculator';

export default function Tax() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className='items-center justify-center flex-1 w-full px-2 py-4 bg-white dark:bg-black'>
        <TaxCalculator />
      </View>
    </TouchableWithoutFeedback>
  );
}
