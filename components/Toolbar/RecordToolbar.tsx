import { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { AccountType } from 'api/asset/types';
import { useStyles, TColors } from 'core/theme';
import SelectAssetBottomSheet from 'components/BottomSheet/SelectAssetBottomSheet';

export default function RecordToolbar() {
  const { styles } = useStyles(createStyles);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [date, setDate] = useState<Date>(new Date());
  const [account, setAccount] = useState<AccountType>();

  const onDateChange = (e: any, selectedDate: any) => {
    setDate(selectedDate);
  };

  const onAccountChange = (item: AccountType) => {
    setAccount(item);
  };

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  return (
    <View style={styles.container}>
      <DateTimePicker
        style={{ width: 90 }}
        value={date}
        mode={'date'}
        display='calendar'
        onChange={onDateChange}
      />
      <TouchableOpacity style={styles.textWrapper} onPress={handlePressSelect}>
        <Text style={styles.text}>{account?.accountName ?? 'no account'}</Text>
      </TouchableOpacity>
      <SelectAssetBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        value={account?.accountName as string}
        onChange={onAccountChange}
      />
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      height: 48,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingVertical: 8,
      paddingHorizontal: 16,
      gap: 8,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderColor: '#faf3dd',
    },
    textWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      backgroundColor: theme.bgPrimary,
    },
    text: {
      fontSize: 16,
    },
  });
