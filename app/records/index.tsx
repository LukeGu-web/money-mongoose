import { useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import { useRecordStore } from 'core/stateHooks';
import { useStyles, TColors } from 'core/theme';
import { RecordBottomSheet, EmptyRecordList, ListDayItem } from 'components';

export default function Records() {
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
      <StatusBar style='light' />
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
