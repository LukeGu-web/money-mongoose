import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useEffect } from 'react';
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
import {
  useAddRecord,
  useUpdateRecord,
  useAddTransfer,
  useUpdateTransfer,
} from 'api/record';
import { formatApiError } from 'api/errorFormat';
import { RecordTypes, Record as RecordType } from 'api/record/types';

import { useRecord, useBookStore, useSettingStore } from 'core/stateHooks';
import log from 'core/logger';
import { successToaster } from 'core/toaster';

export default function Record() {
  const { mutate: addRecordApi } = useAddRecord();
  const { mutate: updateRecordApi } = useUpdateRecord();
  const { mutate: addTransferApi } = useAddTransfer();
  const { mutate: updateTransferApi } = useUpdateTransfer();
  const { record, resetRecord } = useRecord();
  const { currentBook } = useBookStore();
  const theme = useSettingStore((state) => state.theme);
  const methods = useForm({
    defaultValues: record,
    criteriaMode: 'all',
  });
  methods.watch(['type']);

  useEffect(() => {
    methods.reset(record);
  }, [record]);

  const callRecordApi = (value: RecordType) => {
    const { id, amount, type, category, asset, ...rest } = value;
    const data: any = {
      ...rest,
      type: type as RecordTypes,
      category: category as string,
      asset: asset ? Number(asset.split('-')[0]) : undefined,
      book: currentBook.id,
      amount: type === RecordTypes.INCOME ? amount : -amount,
    };
    if (id && id > 0) {
      updateRecordApi(
        {
          id,
          ...data,
        },
        {
          onSuccess: (response) => {
            successToaster('Update record successfully');
            log.success('Update record success:', response);
            methods.reset();
            router.navigate('/');
            resetRecord();
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    } else {
      addRecordApi(
        { ...data },
        {
          onSuccess: (response) => {
            successToaster('Add record successfully');
            log.success('Add record success:', response);
            methods.reset();
            router.navigate('/');
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    }
  };

  const callTransferApi = (value: RecordType) => {
    const { id, from_asset, to_asset, ...rest } = value;
    const data: any = {
      ...rest,
      book: currentBook.id,
      from_asset: Number(String(from_asset).split('-')[0]),
      to_asset: Number(String(to_asset).split('-')[0]),
    };
    if (id && id > 0) {
      updateTransferApi(
        {
          id,
          ...data,
        },
        {
          onSuccess: (response) => {
            successToaster('Update transfer successfully');
            log.success('Update transfer success:', response);
            methods.reset();
            router.navigate('/');
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    } else {
      addTransferApi(
        {
          ...data,
        },
        {
          onSuccess: (response) => {
            successToaster('Add transfer successfully');
            log.success('Add transfer success:', response);
            methods.reset();
            router.navigate('/');
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    }
  };

  const handleSubmit = methods.handleSubmit((data) => {
    log.info('Submit create record data: ', {
      ...data,
      book: currentBook.id,
    });
    if (methods.getValues('type') === RecordTypes.TRANSFER) {
      callTransferApi(data);
    } else {
      callRecordApi(data);
    }
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#03045E' }}
      edges={['top']}
    >
      <View className='flex-1 bg-white dark:bg-black'>
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
        style={{
          flex: 0,
          backgroundColor: theme === 'dark' ? 'black' : 'white',
        }}
      />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
