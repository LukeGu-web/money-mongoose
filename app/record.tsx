import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DigitalPad, RecordCategory } from 'components';
import { type Record, type RecordTypes } from 'api/record/types';

export type RecordCategoryInputType = {
  type: RecordTypes;
  category: string;
  subcategory: string;
};

export default function Record() {
  // const [recordCategory, setRecordCategory] =
  //   useState<RecordCategoryInputType>();

  // const handleSetCategories = (value: RecordCategoryInputType) => {
  //   setRecordCategory(value);
  // };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <RecordCategory />
      <DigitalPad />
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
