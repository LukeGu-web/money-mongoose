import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettingStore } from 'core/stateHooks';
import CurrencyConvertor from 'components/Currency/CurrencyConvertor';

export default function Currency() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme === 'dark' ? 'black' : 'white',
      }}
      edges={['bottom']}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className='items-center justify-center flex-1 w-full p-2 bg-white dark:bg-black'>
          <CurrencyConvertor />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
