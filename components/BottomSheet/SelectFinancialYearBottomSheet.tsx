import { View, Text } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';

import { useGetFlatAssets } from 'api/asset';
import { useBookStore } from 'core/stateHooks';
import BottomSheet from './BottomSheet';
import { AssetType } from 'api/types';

const years = [
  '2017-2018',
  '2018-2019',
  '2019-2020',
  '2020-2021',
  '2021-2022',
  '2022-2023',
  '2023-2024',
  '2024-2025',
];

type SelectFinancialYearBottomSheetProps = {
  value: string | undefined;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  onChange: (itemValue: string) => void;
};

export default function SelectFinancialYearBottomSheet({
  value,
  bottomSheetModalRef,
  onChange,
}: SelectFinancialYearBottomSheetProps) {
  const handleSelectItem = (itemValue: string | number, itemIndex: number) => {
    onChange(itemValue as string);
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={280}>
      <View className='items-center justify-between w-full gap-4 px-4'>
        <View className='flex-row w-full p-4'>
          <Text className='text-2xl font-bold'>Select Year</Text>
        </View>
        <View className='items-start flex-1 w-full'>
          <PickerIOS
            selectedValue={value}
            onValueChange={handleSelectItem}
            style={{ flex: 1, width: '100%' }}
          >
            {years.map((item) => (
              <PickerIOS.Item key={item} label={item} value={item} />
            ))}
          </PickerIOS>
        </View>
      </View>
    </BottomSheet>
  );
}
