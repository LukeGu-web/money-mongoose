import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DigitalPad, RecordCategory, RecordToolbar } from 'components';
import type { Record, RecordTypes } from 'api/record/types';

export type RecordCategoryInputType = {
  type: RecordTypes;
  category: string;
  subcategory: string;
};

export default function Record() {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <RecordCategory />
      <RecordToolbar />
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
