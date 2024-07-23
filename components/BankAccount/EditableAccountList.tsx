import { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useShallow } from 'zustand/react/shallow';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ListItem from './ListItem';
import EditableGroupTitle from '../ExpandView/EditableGroupTitle';
import EditAssetGroupBottomSheet from '../BottomSheet/EditAssetGroupBottomSheet';

import { useStyles, TColors } from 'core/theme';
import { useAssetStore, useAsset } from 'core/stateHooks';
import { AccountType } from 'api/asset/types';

export default function EditableAccountList() {
  const { styles, theme } = useStyles(createStyles);
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
    <View style={styles.container}>
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
              <View style={styles.listContainer}>
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
        <View style={styles.noItemContainer}>
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

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 8,
    },
    listContainer: {
      flex: 1,
      width: '100%',
    },
    noItemContainer: {
      alignItems: 'center',
      backgroundColor: theme.bgPrimary,
      paddingVertical: 16,
      borderRadius: 8,
    },
    addBtn: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
      padding: 8,
      borderRadius: 8,
    },
  });
