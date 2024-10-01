import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import IconTable from './IconTable';
import { Subcategory, CustomCategory } from './ModalContents';

import { RecordTypes } from 'api/record/types';
import expenseCategory from 'static/record-expense-category.json';
import incomeCategory from 'static/record-income-category.json';

export default function RecordCategory() {
  const { control, getValues, setValue } = useFormContext();
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const category =
    getValues('type') === RecordTypes.INCOME ? incomeCategory : expenseCategory;

  const handleCategory = (item: string, hasSubcategory: boolean) => {
    setValue('category', item, { shouldValidate: true });
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

  const handleCustom = () => {
    setIsVisible(true);
    setIsCustom(true);
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
              onSetCustom={handleCustom}
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
          <View
            className='items-center justify-center h-full'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            {isCustom ? (
              <CustomCategory onClose={() => setIsVisible(false)} />
            ) : (
              <Subcategory
                subcategory={subcategory}
                onClose={() => setIsVisible(false)}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
