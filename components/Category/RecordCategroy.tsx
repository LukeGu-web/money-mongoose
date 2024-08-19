import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import IconTable from './IconTable';
import Icon from '../Icon/Icon';

import { RecordTypes } from 'api/record/types';
import { useRecord } from 'core/stateHooks';
import expenseCategory from 'static/record-expense-category.json';
import incomeCategory from 'static/record-income-category.json';

export default function RecordCategory() {
  const { record, setRecord } = useRecord(
    useShallow((state) => ({
      record: state.record,
      setRecord: state.setRecord,
    }))
  );

  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const category =
    record.type === RecordTypes.INCOME ? incomeCategory : expenseCategory;

  const handleSelectIcon = (item: string, hasSubcategory: boolean) => {
    if (item !== record.category) {
      setRecord({ category: item, subcategory: '' });
    }
    if (hasSubcategory) {
      setIsVisible(true);
      if (record.type === RecordTypes.INCOME) {
        setSubcategory(incomeCategory[item as keyof typeof incomeCategory]);
      } else {
        setSubcategory(expenseCategory[item as keyof typeof expenseCategory]);
      }
    }
  };
  const handleSelectL2Icon = (item: string) => {
    setRecord({ subcategory: item });
    setIsVisible(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconTable
          data={category}
          selectedCategory={record.category}
          selectedSubcategory={record.subcategory}
          onSelectIcon={handleSelectIcon}
        />
      </ScrollView>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View
            className='items-center justify-center h-full'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <View className='items-center w-11/12 gap-6 p-6 bg-white rounded-lg'>
              <View className='flex-row justify-between w-full'>
                <Text className='mb-4 text-center'>{record.category}</Text>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Icon name='close' size={24} color='#000' />
                </TouchableOpacity>
              </View>
              {record.category !== '' && (
                <IconTable
                  data={subcategory}
                  selectedCategory={record.subcategory as string}
                  onSelectIcon={handleSelectL2Icon}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
