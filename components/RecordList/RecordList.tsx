import { useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import EmptyRecordList from './EmptyRecordList';
import { useRecordStore } from 'core/stateHooks';
import ListDayItem from './ListDayItem';
import { useStyles, TColors } from 'core/theme';
import RecordBottomSheet from '../BottomSheet/RecordBottomSheet';

export default function RecordList() {
  const records = useRecordStore((state) => state.records);
  const { styles } = useStyles(createStyles);
  const isUpdated =
    records.length > 0 && dayjs().isAfter(dayjs(records[0].date));
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressItem = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      {isUpdated ? (
        <View style={styles.listContainer}>
          <View style={styles.headerContainer}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Last 7 days</Text>
            <TouchableOpacity style={styles.verticalContainer}>
              <Text>All records</Text>
              <AntDesign name='doubleright' size={14} color='black' />
            </TouchableOpacity>
          </View>
          <FlashList
            data={records}
            renderItem={({ item }) => (
              <ListDayItem item={item} onPress={handlePressItem} />
            )}
            estimatedItemSize={200}
          />
          <RecordBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyRecordList />
        </View>
      )}
    </View>
  );
}
const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    verticalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContainer: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: theme.bgPrimary,
    },
    headerContainer: {
      padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: 18,
    },
  });
