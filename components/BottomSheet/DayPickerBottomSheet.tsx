import { View, Text } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';
import BottomSheet from './BottomSheet';
import { useSettingStore } from 'core/stateHooks';

type PickerpBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  data: string[];
  value: string;
  onChange: (itemValue: number | string, itemIndex: number) => void;
};

export default function DayPickerBottomSheet({
  bottomSheetModalRef,
  data,
  value,
  onChange,
}: PickerpBottomSheetProps) {
  const theme = useSettingStore((state) => state.theme);
  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={240}>
      <View className='items-center flex-1 w-full gap-2 p-2'>
        <Text className='text-xl font-semibold dark:color-white'>
          Select Day
        </Text>
        <View className='items-center flex-1 w-full '>
          <PickerIOS
            selectedValue={value}
            onValueChange={onChange}
            style={{ flex: 1, width: '100%' }}
            itemStyle={{ color: theme === 'dark' ? 'white' : 'black' }}
          >
            {data.map((item, index) => (
              <PickerIOS.Item key={item} label={item} value={index + 1} />
            ))}
          </PickerIOS>
        </View>
      </View>
    </BottomSheet>
  );
}
