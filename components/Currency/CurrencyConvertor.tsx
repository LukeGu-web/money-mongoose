import { View, Text, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSettingStore } from 'core/stateHooks';

export default function CurrencyConvertor() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <View className='items-start justify-center flex-1 gap-2'>
      <Text>Currency</Text>
    </View>
  );
}
