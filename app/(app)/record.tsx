import { useEffect, useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, FormProvider } from 'react-hook-form';
import { router, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useShallow } from 'zustand/react/shallow';
import { DigitalPad, RecordCategory } from 'components';

import { RecordTypes } from 'api/record/types';
import { useAddRecord } from 'api/record/useAddRecord';
import { formatApiError } from 'api/errorFormat';
import { useRecord, useRecordStore } from 'core/stateHooks';

export type RecordCategoryInputType = {
  type: RecordTypes;
  category: string;
  subcategory: string;
};

export default function Record() {
  const methods = useForm({
    defaultValues: {
      category: '',
      subcategory: '',
      note: '',
      amount: 0,
    },
    criteriaMode: 'all',
  });
  const { errors } = methods.formState;
  const { mutate: addRecordApi } = useAddRecord();
  const addRecord = useRecordStore((state) => state.addRecord);
  const { record, setRecord, resetRecord } = useRecord(
    useShallow((state) => ({
      record: state.record,
      setRecord: state.setRecord,
      resetRecord: state.resetRecord,
    }))
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        methods.reset();
      };
    }, [])
  );

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      let message = '';
      Object.values(errors).forEach((value) => {
        message += `${value.message}\n`;
      });
      Alert.alert('Tip', message, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  }, [errors]);

  const handleSubmit = (isRediecting: boolean, onReset: () => void) => {
    methods.handleSubmit((data) => {
      console.log('isRediecting: ', isRediecting);
      console.log('handleSubmit: ', data);
      addRecordApi(
        {
          ...data,
          type: record.type,
          amount:
            record.type === RecordTypes.INCOME ? data.amount : -data.amount,
        },
        {
          onSuccess: (response) => {
            console.log('submit success:', response);
            addRecord(response);
            onReset();
            resetRecord();
            methods.reset();
            if (isRediecting) router.navigate('/');
          },
          onError: (error) => {
            console.log('error: ', formatApiError(error));
          },
        }
      );
    })();
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <FormProvider {...methods}>
        <RecordCategory />
        <DigitalPad onSubmit={handleSubmit} />
      </FormProvider>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
