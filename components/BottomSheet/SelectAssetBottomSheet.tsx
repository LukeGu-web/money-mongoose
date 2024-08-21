import { View, Text } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';

import { useRecord, useBookStore } from 'core/stateHooks';
import BottomSheet from './BottomSheet';
import { AssetType, BookType } from 'api/types';

type SelectAssetBottomSheetProps = {
  target: string; // asset | from_asset | to_asset
  value: string | undefined;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function SelectAssetBottomSheet({
  target,
  value,
  bottomSheetModalRef,
}: SelectAssetBottomSheetProps) {
  const { getCurrentBook } = useBookStore();
  const { setRecord } = useRecord();
  const flatAssets = (getCurrentBook() as BookType).groups.flatMap(
    (group) => group.assets
  );

  const handleSelectItem = (itemValue: string | number, itemIndex: number) => {
    const selectItem = flatAssets.find(
      (item) => item.id === Number((itemValue as string).split('-')[0])
    ) as AssetType;
    setRecord({ [target]: `${selectItem.id}-${selectItem.name}` });
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={280}>
      <View className='items-center justify-between w-full gap-4 px-4'>
        <View className='flex-row w-full p-4'>
          <Text className='text-2xl font-bold'>Select Account</Text>
        </View>
        <View className='items-start flex-1 w-full'>
          <PickerIOS
            selectedValue={value}
            onValueChange={handleSelectItem}
            style={{ flex: 1, width: '100%' }}
          >
            {flatAssets.map((item) => (
              <PickerIOS.Item
                key={item.id}
                label={item.name}
                value={`${item.id}-${item.name}`}
              />
            ))}
          </PickerIOS>
        </View>
      </View>
    </BottomSheet>
  );
}
