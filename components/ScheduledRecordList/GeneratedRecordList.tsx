import { Alert, View, Text, Image, ActivityIndicator } from 'react-native';

import { useGetScheduledRecordDetails } from 'api/period';

export default function GeneratedRecordList() {
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useGetScheduledRecordDetails({ variables: { id: 139 } });

  if (isPending || isFetching)
    return (
      <View className='items-center justify-center flex-1 gap-2'>
        <ActivityIndicator size='large' />
        <Text>Loading data...</Text>
      </View>
    );
  console.log('GeneratedRecordList:', data);
  return (
    <View>
      <Text>GeneratedRecordList</Text>
    </View>
  );
}
