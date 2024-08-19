import { View, Text } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';

import { useAsset, useBookStore } from 'core/stateHooks';
import BottomSheet from './BottomSheet';
import { AssetType, BookType } from 'api/types';

type SelectAssetBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function SelectAssetBottomSheet({
  bottomSheetModalRef,
}: SelectAssetBottomSheetProps) {
  const { getCurrentBook } = useBookStore();
  const { asset, setSelect } = useAsset();
  const flatAssets = (getCurrentBook() as BookType).groups.flatMap(
    (group) => group.assets
  );

  const handleSelectItem = (itemValue: number | string, itemIndex: number) => {
    const selectItem = flatAssets.find(
      (item) => item.name === itemValue
    ) as AssetType;
    setSelect(selectItem);
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={280}>
      <View className='items-center justify-between w-full gap-4 px-4'>
        <View className='flex-row w-full p-4'>
          <Text className='text-2xl font-bold'>Select Account</Text>
        </View>
        <View className='items-start flex-1 w-full'>
          <PickerIOS
            selectedValue={asset.name}
            onValueChange={handleSelectItem}
            style={{ flex: 1, width: '100%' }}
          >
            {flatAssets.map((item) => (
              <PickerIOS.Item
                key={item.id}
                label={item.name}
                value={item.name}
              />
            ))}
          </PickerIOS>
        </View>
      </View>
    </BottomSheet>
  );
}
