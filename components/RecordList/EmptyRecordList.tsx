import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

import { useGetRecordsByDateRange } from 'api/record/useGetRecordsByDateRange';
import { formatApiError } from 'api/errorFormat';
import { use7DaysRecordList } from 'core/stateHooks';

export default function EmptyRecordList() {
  const set7DaysRecords = use7DaysRecordList((state) => state.set7DaysRecords);
  const now = dayjs();
  const startDate = now.subtract(6, 'day').format('YYYY-MM-DD');
  const endDate = now.add(1, 'day').format('YYYY-MM-DD');
  const variables = {
    start_date: startDate,
    end_date: endDate,
    group_by_date: true,
    is_decreasing: true,
  };

  const { isLoading, isError, data, error } = useGetRecordsByDateRange({
    variables,
  });

  useEffect(() => {
    if (data) set7DaysRecords(data);
  }, [data]);

  if (isLoading) return <Text>is loading...</Text>;

  if (isError) {
    const formattedError = formatApiError(error);
    if (formattedError.status !== 404)
      return <Text>Sorry, something went wrong. Please try it again.</Text>;
  }

  return <Text>You don't have any record.</Text>;
}
