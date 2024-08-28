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
import { useRecord, useBookStore } from 'core/stateHooks';
import log from 'core/logger';

export default function Record() {
  const { record } = useRecord();
  const { currentBook, getCurrentBook } = useBookStore();
  const methods = useForm({
    defaultValues: record,
    criteriaMode: 'all',
  });

  const handleSubmit = methods.handleSubmit((data) => {
    log.info('Submit create record data: ', {
      ...data,
      book: currentBook.id,
    });
    //   if (record.type === RecordTypes.TRANSFER) {
    //     callTransferApi(isRedirect);
    //   } else {
    //     callRecordApi(isRedirect);
    //   }
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
          <DigitalPad onSubmit={handleSubmit} />
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
