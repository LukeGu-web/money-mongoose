import { useRef, useCallback } from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useShallow } from 'zustand/react/shallow';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ListItem from './ListItem';
import EditableGroupTitle from '../ExpandView/EditableGroupTitle';
import EditAssetGroupBottomSheet from '../BottomSheet/EditAssetGroupBottomSheet';
import { useAssetStore, useAsset } from 'core/stateHooks';

export default function EditableAccountList() {
  const { accounts, numOfGroups } = useAssetStore(
    useShallow((state) => ({
      accounts: state.accounts,
      numOfGroups: state.numOfGroups,
    }))
  );
  const account = useAsset((state) => state.account);

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
      {Object.keys(accounts).map((group) => {
        if (accounts[group].length > 0) {
          const title = {
            text: group,
            number: accounts[group].length,
            amount: accounts[group].reduce(
              (sum, item) => sum + Number(item.balance),
              0
            ),
          };
          return (
            <EditableGroupTitle
              key={group}
              title={title}
              height={40 * accounts[group].length}
            >
              <View className='flex-1 w-full'>
                <FlashList
                  data={accounts[group]}
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
      {numOfGroups === 0 && (
        <View className='items-center py-4 bg-gray-200 rounded-md'>
          <Text>No account yet</Text>
        </View>
      )}
      <EditAssetGroupBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        funtions={functions}
        title={account.accountName}
        onCancel={handleCloseSheet}
      />
    </View>
  );
}
