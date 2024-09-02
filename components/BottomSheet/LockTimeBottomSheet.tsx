import { View, Text } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';
import { useShallow } from 'zustand/react/shallow';
import BottomSheet from './BottomSheet';
import { useSettingStore } from 'core/stateHooks';

type LockTimeBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

const timeData = [1, 5, 10];

export default function LockTimeBottomSheet({
  bottomSheetModalRef,
}: LockTimeBottomSheetProps) {
  const { lockTime, setLockTime } = useSettingStore(
    useShallow((state) => ({
      lockTime: state.lockTime,
      setLockTime: state.setLockTime,
    }))
  );
  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={240}>
      <View className='items-center flex-1 w-full gap-2 p-2'>
        <Text className='text-xl font-semibold'>Select Lock Time</Text>
        <View className='items-center flex-1 w-full '>
          <PickerIOS
            selectedValue={lockTime}
            onValueChange={(itemValue: string | number) => {
              setLockTime(itemValue as number);
            }}
            style={{ flex: 1, width: '100%' }}
          >
            {timeData.map((item, index) => (
              <PickerIOS.Item
                key={item}
                label={`${item} minute${item > 1 ? 's' : ''}`}
                value={item}
              />
            ))}
          </PickerIOS>
        </View>
      </View>
    </BottomSheet>
  );
}
