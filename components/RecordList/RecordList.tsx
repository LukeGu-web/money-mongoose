import { Button, View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';

import EmptyRecordList from './EmptyRecordList';
import { useRecordStore } from 'core/stateHooks';
import ListDayItem from './ListDayItem';
import { useStyles, TColors } from 'core/theme';

export default function RecordList() {
  const records = useRecordStore((state) => state.records);
  const { theme, styles } = useStyles(createStyles);
  const isUpdated =
    records.length > 0 && dayjs().isAfter(dayjs(records[0].date));
  const lastDay = dayjs().subtract(6, 'day').format('YYYY-MM-DD');
  console.log('RecordList: ', isUpdated, records);
  // const recentRecords =

  return (
    <View style={styles.container}>
      {isUpdated ? (
        <View style={styles.listContainer}>
          <View style={styles.headerContainer}>
            <Text>Last 7 days</Text>
            <Button title='All bills >' />
          </View>
          <FlashList
            data={records}
            renderItem={({ item }) => <ListDayItem item={item} />}
            estimatedItemSize={200}
          />
        </View>
      ) : (
        <EmptyRecordList />
      )}
    </View>
  );
}
const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainer: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: theme.bgPrimary,
    },
    headerContainer: {
      padding: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: 18,
    },
  });
