import { useState, useRef } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useGetScheduledRecordList } from 'api/period';

export default function ScheduledRecordList() {
  const { isPending, isError, error, data, isFetching } =
    useGetScheduledRecordList();
  if (isPending || isFetching)
    return (
      <View className='items-center justify-center flex-1 gap-2'>
        <ActivityIndicator size='large' />
        <Text>Loading data...</Text>
      </View>
    );
  console.log('ScheduledRecordList: ', data);
  return <ScrollView className='flex-1'></ScrollView>;
}
