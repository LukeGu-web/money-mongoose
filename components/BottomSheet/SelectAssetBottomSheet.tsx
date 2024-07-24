import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';

import { AccountType } from 'api/asset/types';
import { useStyles, TColors } from 'core/theme';
import { useAssetStore } from 'core/stateHooks';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type SelectAssetBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  value: string;
  onChange: (item: AccountType) => void;
};

export default function SelectAssetBottomSheet({
  bottomSheetModalRef,
  value,
  onChange,
}: SelectAssetBottomSheetProps) {
  const { styles, theme } = useStyles(createStyles);
  const accounts = useAssetStore((state) => state.accounts);
  const flatAccounts = Object.values(accounts).flat();

  const handleSelectItem = (itemValue: number | string, itemIndex: number) => {
    const selectItem = flatAccounts.find(
      (item) => item.accountName === itemValue
    );
    onChange(selectItem as AccountType);
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={280}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.headerText}>Select Account</Text>
        </View>
        <View style={styles.contentContainer}>
          <PickerIOS
            selectedValue={value}
            onValueChange={handleSelectItem}
            style={{ flex: 1, width: '100%' }}
          >
            {flatAccounts.map((item) => (
              <PickerIOS.Item
                key={item.accountName}
                label={item.accountName}
                value={item.accountName}
              />
            ))}
          </PickerIOS>
        </View>
      </View>
    </BottomSheet>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      gap: 8,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 600,
    },
    contentContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'flex-start',
    },
    titleWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    addBtn: {
      width: '100%',
      backgroundColor: 'yellow',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
    },
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      height: '100%',
    },
    modalView: {
      width: '90%',
      backgroundColor: theme.white,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: theme.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      gap: 16,
    },
    input: {
      width: '90%',
      borderWidth: 1,
      padding: 10,
      borderRadius: 8,
    },
    buttonGroup: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  });
