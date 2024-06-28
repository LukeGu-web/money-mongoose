import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { useRecordList } from 'core/stateHooks/useRecordList';
import ListItem from './ListItem';
import EmptyRecordList from './EmptyRecordList';
import { useGetRecordsByDateRange } from 'api/record/useGetRecordsByDateRange';
import { use7DaysRecordList } from 'core/stateHooks/use7DaysRecordList';
import ListDayItem from './ListDayItem';

export default function RecordList() {
  const records = use7DaysRecordList((state) => state.recordsData);

  // console.log('useGetRecordsByDateRange: ', data);

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '50%',
  },
});
