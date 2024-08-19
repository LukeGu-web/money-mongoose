import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';

import { useStyles, TColors } from 'core/theme';
import BottomSheet from './BottomSheet';

type PickerpBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  data: string[];
  value: string;
  onChange: (itemValue: number | string, itemIndex: number) => void;
};

export default function PickerBottomSheet({
  bottomSheetModalRef,
  data,
  value,
  onChange,
}: PickerpBottomSheetProps) {
  const { styles } = useStyles(createStyles);

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={240}>
      <View className='items-center flex-1 w-full gap-2 p-2'>
        <Text className='text-xl font-semibold'>Select Day</Text>
        <View className='items-center flex-1 w-full '>
          <PickerIOS
            selectedValue={value}
            onValueChange={onChange}
            style={{ flex: 1, width: '100%' }}
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

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    // container: {
    //   flex: 1,
    //   width: '100%',
    //   alignItems: 'center',
    //   padding: 8,
    //   gap: 8,
    // },
    // headerText: {
    //   fontSize: 20,
    //   fontWeight: 600,
    // },
    contentContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
  });
