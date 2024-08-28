import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, Alert } from 'react-native';
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
  methods.watch(['type']);
  const { errors } = methods.formState;

  // const callRecordApi = (isRedirect: boolean) => {
  //   const { id, amount, type, category, asset, ...rest } = record;
  //   const data: any = {
  //     ...rest,
  //     type: type as RecordTypes,
  //     category: category as string,
  //     asset: asset ? Number(asset.split('-')[0]) : undefined,
  //     book: currentBook.id,
  //     amount: type === RecordTypes.INCOME ? amount : -amount,
  //   };
  //   if (id && id > 0) {
  //     updateRecordApi(
  //       {
  //         id,
  //         ...data,
  //       },
  //       {
  //         onSuccess: (response) => {
  //           log.success('Add record success:', response);

  //           updateRecord({
  //             ...response,
  //             amount: Number(response.amount),
  //           });
  //           handleReset();
  //           resetRecord();
  //           if (isRedirect) router.push('/');
  //         },
  //         onError: (error) => {
  //           log.error('Error: ', formatApiError(error));
  //         },
  //       }
  //     );
  //   } else {
  //     addRecordApi(
  //       { ...data },
  //       {
  //         onSuccess: (response) => {
  //           log.success('Add record success:', response);
  //           addRecord({
  //             ...response,
  //             amount: Number(response.amount),
  //           });
  //           handleReset();
  //           resetRecord();
  //           if (isRedirect) router.push('/');
  //         },
  //         onError: (error) => {
  //           log.error('Error: ', formatApiError(error));
  //         },
  //       }
  //     );
  //   }
  // };

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
          {methods.getValues('type') === RecordTypes.TRANSFER ? (
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
