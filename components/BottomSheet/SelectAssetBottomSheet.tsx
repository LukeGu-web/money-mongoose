import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';

import { useGetFlatAssets } from 'api/asset';
import { useBookStore, useSettingStore, useAsset } from 'core/stateHooks';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';
import { AssetType } from 'api/types';

type SelectAssetBottomSheetProps = {
  data?: AssetType[];
  value: string | undefined;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  onChange: (itemValue: number | string, itemIndex: number) => void;
};

export default function SelectAssetBottomSheet({
  data,
  value,
  bottomSheetModalRef,
  onChange,
}: SelectAssetBottomSheetProps) {
  const theme = useSettingStore((state) => state.theme);
  const currentBook = useBookStore((state) => state.currentBook);
  const resetAsset = useAsset((state) => state.resetAsset);

  const handleSelectItem = (itemValue: string | number, itemIndex: number) => {
    const selectItem = data?.find(
      (item) => item.id === Number((itemValue as string).split('-')[0])
    ) as AssetType;
    onChange(`${selectItem.id}-${selectItem.name}`, itemIndex);
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={280}>
      <View className='items-center justify-between w-full gap-4 px-4'>
        <View className='flex-row w-full p-4'>
          <Text className='text-2xl font-bold dark:color-white'>
            Select Account
          </Text>
        </View>
        {data && data.length > 0 ? (
          <View className='items-start flex-1 w-full'>
            <PickerIOS
              selectedValue={value}
              onValueChange={handleSelectItem}
              style={{ flex: 1, width: '100%' }}
              itemStyle={{ color: theme === 'dark' ? 'white' : 'black' }}
            >
              {data.map((item) => (
                <PickerIOS.Item
                  key={item.id}
                  label={item.name}
                  value={`${item.id}-${item.name}`}
                />
              ))}
            </PickerIOS>
          </View>
        ) : (
          <View>
            <Text className='py-8 text-2xl font-semibold color-zinc-500'>
              No account yet
            </Text>
            <Pressable
              className='flex-row items-center justify-center gap-2 p-2'
              onPress={() => {
                resetAsset();
                bottomSheetModalRef.current?.dismiss();
                router.push('/asset/details');
              }}
            >
              <Text className='color-blue-500'>Add account</Text>
              <Icon name='credit-card-plus' size={20} color='#3b82f6' />
            </Pressable>
          </View>
        )}
      </View>
    </BottomSheet>
  );
}
