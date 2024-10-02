import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import IconTable from './IconTable';
import { Subcategory, CustomCategory } from './ModalContents';

import { RecordTypes } from 'api/record/types';
import expenseCategory from 'static/record-expense-category.json';
import incomeCategory from 'static/record-income-category.json';

export default function RecordCategory() {
  const { control, getValues, setValue, resetField } = useFormContext();
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? -60 : 0;
  const category =
    getValues('type') === RecordTypes.INCOME ? incomeCategory : expenseCategory;

  const handleCategory = (item: string, hasSubcategory: boolean) => {
    setValue('category', item, { shouldValidate: true });
    resetField('subcategory');
    setIsVisible(hasSubcategory);
    setIsCustom(false);
    if (hasSubcategory) {
      if (getValues('type') === RecordTypes.INCOME) {
        setSubcategory(incomeCategory[item as keyof typeof incomeCategory]);
      } else {
        setSubcategory(expenseCategory[item as keyof typeof expenseCategory]);
      }
    }
  };

  const handleOpenCustom = () => {
    setIsVisible(true);
    setIsCustom(true);
  };

  const handleCustomCategory = (category: string, subcategory: string) => {
    setValue('category', category);
    setValue('subcategory', subcategory);
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
          render={() => (
            <IconTable
              data={category}
              onSelect={handleCategory}
              onSetCustom={handleOpenCustom}
            />
          )}
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardVerticalOffset}
            className='items-center justify-center h-full'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            {isCustom ? (
              <CustomCategory
                onClose={() => setIsVisible(false)}
                onCustom={handleCustomCategory}
              />
            ) : (
              <Subcategory
                subcategory={subcategory}
                onClose={() => setIsVisible(false)}
              />
            )}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
