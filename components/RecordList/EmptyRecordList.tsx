import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

import { useGetRecordsByDateRange } from 'api/record/useGetRecordsByDateRange';
import { formatApiError } from 'api/errorFormat';
import { useRecordStore } from 'core/stateHooks';

export default function EmptyRecordList() {
  const setRecords = useRecordStore((state) => state.setRecords);

  const now = dayjs();
  const startDate = now.subtract(3, 'month').format('YYYY-MM-DD');
  const endDate = now.add(1, 'day').format('YYYY-MM-DD');
  const variables = {
    start_date: startDate,
    end_date: endDate,
    group_by_date: true,
    is_decreasing: true,
  };

  // Here is the entry of querying records from DB
  // First query will grab recent 3 months' records
  const { isLoading, isError, data, error } = useGetRecordsByDateRange({
    variables,
  });

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
