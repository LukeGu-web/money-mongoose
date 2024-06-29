import { View, Text, StyleSheet } from 'react-native';
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
    records.length !== 0 && dayjs().isAfter(dayjs(records[0].date));

  return (
    <View style={styles.container}>
      {isUpdated ? (
        <FlashList
          data={records}
          renderItem={({ item }) => <ListDayItem item={item} />}
          estimatedItemSize={200}
        />
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
      height: '50%',
      backgroundColor: theme.bgPrimary,
    },
  });
