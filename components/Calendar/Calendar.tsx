import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  Calendar as ClendarPicker,
  LocaleConfig,
} from 'react-native-calendars';
import dayjs from 'dayjs';

import CalendarDay from './CalendarDay';
import { formatApiError } from 'api/errorFormat';
import { useGetRecordsByDateRange } from 'api/record/useGetRecordsByDateRange';
import { useRecordStore } from 'core/stateHooks';

export default function Calendar() {
  const [selected, setSelected] = useState('');
  const records = useRecordStore((state) => state.records);
  // const now = dayjs();
  // const firstDay = now.subtract(1, 'month').format('YYYY-MM-DD');
  // const lastDay = now.add(1, 'month').format('YYYY-MM-DD');
  // const variables = {
  //   start_date: firstDay,
  //   end_date: lastDay,
  //   group_by_date: true,
  // };

  // const { isLoading, isError, data, error } = useGetRecordsByDateRange({
  //   variables,
  // });

  // console.log('Calendar - useGetRecordsByDateRange: ', data);

  // if (isLoading) return <Text>is loading...</Text>;

  // if (isError) {
  //   const formattedError = formatApiError(error);
  //   if (formattedError.status !== 404)
  //     return <Text>Sorry, something went wrong. Please try it again.</Text>;
  // }

  let formattedData = {};
  records.map((item) => {
    formattedData = { ...formattedData, [item.date]: item };
  });
  console.log(formattedData);

  //recordData={formattedData[date]}
  return (
    <View style={styles.container}>
      <ClendarPicker
        // initialDate={selected}
        dayComponent={({ date, state }) => (
          <CalendarDay
            date={date}
            state={state}
            recordData={
              formattedData[date?.dateString! as keyof typeof formattedData]
            }
          />
        )}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        // onMonthChange={(data) => {
        //   console.log('onMonthChange: ', data);
        // }}
        hideExtraDays={true}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'green',
          },
        }}
      />
      <Button title='back today' onPress={() => setSelected('2024-06-29')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
