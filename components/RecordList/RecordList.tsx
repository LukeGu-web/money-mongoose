import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import EmptyRecordList from './EmptyRecordList';
import { use7DaysRecordList } from 'core/stateHooks';
import ListDayItem from './ListDayItem';

import { useStyles, TColors } from 'core/theme';

export default function RecordList() {
  const records = use7DaysRecordList((state) => state.recordsData);
  const { theme, styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      {records.length === 0 ? (
        <EmptyRecordList />
      ) : (
        <FlashList
          data={records}
          renderItem={({ item }) => <ListDayItem item={item} />}
          estimatedItemSize={200}
        />
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
