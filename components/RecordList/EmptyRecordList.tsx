import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetRecordList } from 'api/record/useGetRecordList';
import { useRecordList } from 'core/useRecordList';

export default function EmptyRecordList() {
  const setRecords = useRecordList((state) => state.setRecords);
  const { isLoading, isError, data } = useGetRecordList();

  useEffect(() => {
    if (data) setRecords(data);
  }, [data]);

  console.log('useGetRecordList: ', isLoading, isError, data);

  if (isLoading) return <Text>is loading...</Text>;

  if (isError) return <Text> isError</Text>;

  return <Text>You don't have any record.</Text>;
}
