import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, FormProvider } from 'react-hook-form';
import {
  RecordHeader,
  DigitalPad,
  RecordCategory,
  RecordToolbar,
  Transfer,
} from 'components';
import { RecordTypes } from 'api/record/types';
import { useRecord } from 'core/stateHooks';
import { defaultRecord } from 'core/stateHooks/states/useRecord';

export default function Record() {
  const { record } = useRecord();
  const methods = useForm({
    defaultValues: defaultRecord,
    criteriaMode: 'all',
  });
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['top']}
    >
      <View className='flex-1 bg-white'>
        <FormProvider {...methods}>
          <RecordHeader />
          {record.type === RecordTypes.TRANSFER ? (
            <Transfer />
          ) : (
            <RecordCategory />
          )}
          <RecordToolbar />
          <DigitalPad />
        </FormProvider>
      </View>
      <SafeAreaView
        edges={['bottom']}
        style={{ flex: 0, backgroundColor: '#ffffff' }}
      />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
