import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { useRecordList } from 'core/useRecordList';
import ListItem from './ListItem';
import EmptyRecordList from './EmptyRecordList';

export default function RecordList() {
  const records = useRecordList((state) => state.records);

  return (
    <View style={styles.container}>
      {records.length === 0 ? (
        <EmptyRecordList />
      ) : (
        <FlashList
          data={records}
          renderItem={({ item }) => <ListItem item={item} />}
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
