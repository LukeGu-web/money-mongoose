import { useRef, useCallback } from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ListItem from './ListItem';
import EditableGroupTitle from '../ExpandView/EditableGroupTitle';
import EditAssetGroupBottomSheet from '../BottomSheet/EditAssetGroupBottomSheet';
import { useAsset, useBookStore } from 'core/stateHooks';

export default function EditableAccountList() {
  const asset = useAsset((state) => state.asset);
  console.log('asset: ', asset);

  let numOfAssets = 0;
  const currentBook = useBookStore((state) => state.currentBook);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const functions = {
    'View Details': () => {},
    'Move to another group': () => {},
  };
  const handlePressItem = () => {
    bottomSheetModalRef.current?.present();
  };
  return (
    <View className='flex-1 gap-2'>
      {currentBook?.groups.map((group) => {
        if (group.assets.length > 0) {
          const assets = group.assets;
          const title = {
            text: group.name,
            number: assets.length,
            amount: assets.reduce((sum, item) => sum + Number(item.balance), 0),
          };
          numOfAssets += assets.length;
          return (
            <EditableGroupTitle
              key={group.id}
              title={title}
              height={40 * assets.length}
            >
              <View className='flex-1 w-full'>
                <FlashList
                  data={assets}
                  renderItem={({ item }) => (
                    <ListItem item={item} onPress={handlePressItem} />
                  )}
                  estimatedItemSize={10}
                />
              </View>
            </EditableGroupTitle>
          );
        }
      })}
      {numOfAssets === 0 && (
        <View className='items-center py-4 bg-gray-200 rounded-md'>
          <Text>No account yet</Text>
        </View>
      )}
      <EditAssetGroupBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        funtions={functions}
        title={asset.name}
        onCancel={handleCloseSheet}
      />
    </View>
  );
}
