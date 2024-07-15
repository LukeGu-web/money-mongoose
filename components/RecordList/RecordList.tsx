import { useCallback, useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import { RecordsByDay } from 'api/record/types';
import EmptyRecordList from './EmptyRecordList';
import { useRecordStore } from 'core/stateHooks';
import ListDayItem from './ListDayItem';
import { useStyles, TColors } from 'core/theme';
import RecordBottomSheet from '../BottomSheet/RecordBottomSheet';
import Icon from '../Icon/Icon';

export default function RecordList() {
  const { styles } = useStyles(createStyles);
  const records = useRecordStore((state) => state.records);
  const [latestRecords, setLatestRecords] = useState<RecordsByDay[]>([]);

  useEffect(() => {
    let n = 0;
    while (dayjs(records[n]?.date).isAfter(dayjs().subtract(6, 'day'), 'day')) {
      const tmpList = [];
      tmpList.push(records[n]);
      setLatestRecords(tmpList);
      n++;
    }
  }, [records]);

  const isUpdated =
    latestRecords.length > 0 && dayjs().isAfter(dayjs(latestRecords[0].date));
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressItem = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Last 7 days</Text>
        <TouchableOpacity
          style={styles.verticalContainer}
          onPress={() => router.navigate('/records')}
        >
          <Text>All records</Text>
          <Icon name='double-right' size={14} color='black' />
        </TouchableOpacity>
      </View>
      {isUpdated ? (
        <View style={styles.listContainer}>
          <FlashList
            data={latestRecords}
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
      borderRadius: 10,
      backgroundColor: theme.bgPrimary,
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
