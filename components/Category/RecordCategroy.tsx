import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import IconTable from './IconTable';
import Icon from '../Icon/Icon';

import { RecordTypes } from 'api/record/types';
import expenseCategory from 'static/record-expense-category.json';
import incomeCategory from 'static/record-income-category.json';

export default function RecordCategory() {
  const { control, getValues, setValue } = useFormContext();
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const category =
    getValues('type') === RecordTypes.INCOME ? incomeCategory : expenseCategory;

  const handleCategory = (item: string, hasSubcategory: boolean) => {
    setValue('category', item, { shouldValidate: true });
    setIsVisible(hasSubcategory);
    if (hasSubcategory) {
      if (getValues('type') === RecordTypes.INCOME) {
        setSubcategory(incomeCategory[item as keyof typeof incomeCategory]);
      } else {
        setSubcategory(expenseCategory[item as keyof typeof expenseCategory]);
      }
    }
  };

  const handleSubcategory = (item: string, hasSubcategory: boolean) => {
    setValue('subcategory', item, { shouldValidate: true });
    setIsVisible(false);
  };

  return (
    <View className='flex-1'>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Please select a category.',
            },
          }}
          render={() => <IconTable data={category} onSelect={handleCategory} />}
          name='category'
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
                <Text className='mb-4 text-center'>
                  {getValues('category')}
                </Text>
                <Pressable onPress={() => setIsVisible(false)}>
                  <Icon name='close' size={24} color='#000' />
                </Pressable>
              </View>
              <Controller
                control={control}
                render={() => (
                  <IconTable data={subcategory} onSelect={handleSubcategory} />
                )}
                name='subcategory'
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
