import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateScheduledRecord } from 'api/period';
import { ScheduledRecordType } from 'api/period/types';
import { RecordTypes, Record as RecordType } from 'api/record/types';
import { formatApiError } from 'api/errorFormat';
import { useBookStore, useSettingStore } from 'core/stateHooks';
import log from 'core/logger';
import { successToaster } from 'core/toaster';
import { CreateButton, RecordForm, PeriodFrequencyForm } from 'components';

export default function PeriodBuilder() {
  const theme = useSettingStore((state) => state.theme);
  const currentBook = useBookStore((state) => state.currentBook);
  const methods = useForm<ScheduledRecordType>({
    defaultValues: {
      start_date: new Date(),
      num_of_days: 1,
      type: RecordTypes.EXPENSE,
    },
    criteriaMode: 'all',
  });

  const { mutate: createPeriodApi } = useCreateScheduledRecord();
  const callPeriodApi = (value: ScheduledRecordType) => {
    if (value.id! > 0) {
      //   updateRecordApi(
      //     {
      //       id,
      //       ...data,
      //     },
      //     {
      //       onSuccess: (response) => {
      //         successToaster('Update record successfully');
      //         log.success('Update record success:', response);
      //         methods.reset();
      //         router.push('/');
      //         resetRecord();
      //       },
      //       onError: (error) => {
      //         log.error('Error: ', formatApiError(error));
      //       },
      //     }
      //   );
    } else {
      createPeriodApi(
        { ...value },
        {
          onSuccess: (response) => {
            successToaster('Create period record successfully');
            log.success('Create period record success:', response);
            methods.reset();
            router.back();
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    }
  };

  const handleFormSubmit = methods.handleSubmit((data: any) => {
    const { amount, type, category, asset, ...rest } = data;
    const formValues: ScheduledRecordType = {
      ...rest,
      type: type as RecordTypes,
      category: category as string,
      asset: asset ? Number(asset.split('-')[0]) : undefined,
      book: currentBook.id,
      amount: type === RecordTypes.INCOME ? amount : -amount,
    };
    log.info('Submit create/update period record data: ', formValues);
    callPeriodApi(formValues);
  });

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <KeyboardAwareScrollView className='p-2'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className='gap-3'>
            <FormProvider {...methods}>
              <PeriodFrequencyForm />
              <RecordForm />
            </FormProvider>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <CreateButton
        targetId={-1}
        isPending={false}
        onPress={handleFormSubmit}
      />
      <StatusBar style='light' />
    </View>
  );
}
