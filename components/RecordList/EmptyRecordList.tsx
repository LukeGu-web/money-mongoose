import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetRecordList } from 'api/record/useGetRecordList';
import { useRecordList } from 'core/stateHooks/useRecordList';
import { formatApiError } from 'api/errorFormat';

export default function EmptyRecordList() {
  const setRecords = useRecordList((state) => state.setRecords);
  const { isLoading, isError, data, error } = useGetRecordList();

  useEffect(() => {
    if (data) setRecords(data);
  }, [data]);

  if (isLoading) return <Text>is loading...</Text>;

  if (isError) {
    const formattedError = formatApiError(error);
    if (formattedError.status !== 404)
      return <Text>Sorry, something went wrong. Please try it again.</Text>;
  }

  return <Text>You don't have any record.</Text>;
}
