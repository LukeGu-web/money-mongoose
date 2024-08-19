import { useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/react/shallow';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useAsset, useRecord } from 'core/stateHooks';
import { useStyles, TColors } from 'core/theme';
import SelectAssetBottomSheet from 'components/BottomSheet/SelectAssetBottomSheet';

export default function RecordToolbar() {
  const { styles } = useStyles(createStyles);
  const asset = useAsset((state) => state.asset);
  const { record, setRecord } = useRecord(
    useShallow((state) => ({
      record: state.record,
      setRecord: state.setRecord,
    }))
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const today = new Date();

  const onDateChange = (e: any, selectedDate: any) => {
    setRecord({ date: dayjs(selectedDate).format('YYYY-MM-DD') });
  };

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  return (
    <View style={styles.container}>
      <DateTimePicker
        style={{ width: 90 }}
        value={record.date !== '' ? new Date(record.date) : today}
        mode={'date'}
        display='calendar'
        onChange={onDateChange}
      />
      <TouchableOpacity style={styles.textWrapper} onPress={handlePressSelect}>
        <Text style={styles.text}>
          {asset.name !== '' ? asset.name : 'no account'}
        </Text>
      </TouchableOpacity>
      <SelectAssetBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
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
