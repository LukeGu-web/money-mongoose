import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Text } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { recordTypes } from 'components/Headers/RecordHeader';
import expenseCategory from 'static/record-expense-category.json';
import incomeCategory from 'static/record-income-category.json';
import IconTable from './IconTable';

const { width } = Dimensions.get('window');
const iconSize = width * 0.15;

export default function RecordCategory() {
  const { recordType } = useGlobalSearchParams();
  const [cateL1, setCateL1] = useState<string>('');
  const [cateL2, setCateL2] = useState<string>('');
  const [l2DataList, setL2DataList] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isIncome = recordType && recordType === recordTypes[1];
  const handleSelectIcon = (item: string, hasSubcategory: boolean) => {
    setCateL1(item);
    setCateL2('');
    if (hasSubcategory) {
      setIsVisible(true);
      //   if (isIncome) {
      //     setL2DataList(incomeL2List[item]);
      //   } else {
      //     setL2DataList(expenseL2List[item]);
      //   }
    }
  };
  const handleSelectL2Icon = (item: string) => {
    setCateL2(item);
  };
  return (
    <ScrollView contentContainerStyle={styles.iconsContainer}>
      {isIncome ? (
        <IconTable
          data={incomeCategory}
          selectedCategory={cateL1}
          selectedSubcategory={cateL2}
          onSelectIcon={handleSelectIcon}
        />
      ) : (
        <IconTable
          data={expenseCategory}
          selectedCategory={cateL1}
          selectedSubcategory={cateL2}
          onSelectIcon={handleSelectIcon}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
