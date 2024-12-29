import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateScheduledRecord } from 'api/period';
import type { ScheduledRecordType } from 'api/period/types';
import { RecordTypes, Record as RecordType } from 'api/record/types';
import { formatApiError } from 'api/errorFormat';
import { useBookStore, useSettingStore } from 'core/stateHooks';
import log from 'core/logger';
import { successToaster } from 'core/toaster';
import { CreateButton, RecordForm, PeriodFrequencyForm } from 'components';

export type PeriodFormType = {
  frequency: string;
  month_day?: number;
  week_days?: number[];
  num_of_days?: number;
  start_date: Date;
  end_date?: Date;
  type: string;
  category: string;
  subcategory?: string;
  amount: string;
  asset?: string;
  note?: string;
  is_marked_tax_return: boolean;
};

const defaultValues = {
  frequency: '',
  start_date: new Date(),
  end_date: undefined,
  type: 'expense',
  category: '',
  subcategory: '',
  amount: '',
  num_of_days: 1,
  is_marked_tax_return: false,
};

export default function PeriodBuilder() {
  const theme = useSettingStore((state) => state.theme);
  const currentBook = useBookStore((state) => state.currentBook);
  const methods = useForm<PeriodFormType>({
    defaultValues: defaultValues,
    criteriaMode: 'all',
  });

  const { mutate: createPeriodApi } = useCreateScheduledRecord();
  const callPeriodApi = (value: RecordType) => {
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
        { ...data },
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

  const handleFormSubmit = methods.handleSubmit((data: any) =>
    console.log('Period build form: ', data)
  );
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
