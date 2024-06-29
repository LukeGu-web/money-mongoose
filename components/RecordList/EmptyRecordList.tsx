import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetRecordsByDateRange } from 'api/record/useGetRecordsByDateRange';
import { formatApiError } from 'api/errorFormat';
import { use7DaysRecordList } from 'core/stateHooks';
import { calculateDate } from 'core/utils';

export default function EmptyRecordList() {
  const set7DaysRecords = use7DaysRecordList((state) => state.set7DaysRecords);
  const startDate = calculateDate(new Date(), -6);
  const endDate = calculateDate(new Date(), 1);
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

  console.log('useGetRecordsByDateRange: ', data);

  if (isLoading) return <Text>is loading...</Text>;

  if (isError) {
    const formattedError = formatApiError(error);
    if (formattedError.status !== 404)
      return <Text>Sorry, something went wrong. Please try it again.</Text>;
  }

  return <Text>You don't have any record.</Text>;
}
