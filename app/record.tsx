import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DigitalPad, RecordCategory } from 'components';
import {
  RecordVariablesSchema,
  type Record,
  type RecordTypes,
} from 'api/record/types';

export type RecordCategoryInputType = {
  type: RecordTypes;
  category: string;
  subcategory: string;
};

export default function Record() {
  const [recordCategory, setRecordCategory] =
    useState<RecordCategoryInputType>();

  const handleSetCategories = (value: RecordCategoryInputType) => {
    setRecordCategory(value);
  };

  const handleSubmit = (note: string, amount: number) => {
    const recordDetails = { ...recordCategory, note, amount };
    const validation = RecordVariablesSchema.safeParse(recordDetails);
    console.log(recordDetails);
    if (!validation.success) {
      let errorMsg = '';
      if (amount === 0) {
        errorMsg += 'Please enter an amount.';
      }
      if ('category' in validation.error.format()) {
        // if (errorMsg !== '') {
        //   errorMsg += '\n';
        // }
        errorMsg += 'Please select a category.';
      }
      Toast.show({
        type: 'error',
        text1: 'Missing field:',
        text2: errorMsg,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <RecordCategory onGetCategories={handleSetCategories} />
      <DigitalPad onSubmit={handleSubmit} />
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
