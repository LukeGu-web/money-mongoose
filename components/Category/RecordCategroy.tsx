import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';

import IconTable from './IconTable';
import Icon from '../Icon/Icon';
import { RecordTypes } from 'api/record/types';
import { useRecord } from 'core/stateHooks';
import { useStyles, TColors } from 'core/theme';

import expenseCategory from 'static/record-expense-category.json';
import incomeCategory from 'static/record-income-category.json';

export default function RecordCategory() {
  const { styles, theme } = useStyles(createStyles);
  const record = useRecord((state) => state.record);
  const { control, getValues, setValue } = useFormContext();
  const category =
    record.type === RecordTypes.INCOME ? incomeCategory : expenseCategory;

  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleCategory = (item: string, hasSubcategory: boolean) => {
    setValue('category', item, { shouldValidate: true });
    setIsVisible(hasSubcategory);
    if (hasSubcategory) {
      if (record.type === RecordTypes.INCOME) {
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
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.iconsContainer}>
        <Controller
          control={control}
          rules={{
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Please select a category.',
            },
            minLength: {
              value: 2,
              message: 'min length',
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>{getValues('category')}</Text>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Icon name='close' size={24} color={theme.black} />
                </TouchableOpacity>
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

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    iconsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      height: '100%',
    },
    modalView: {
      margin: 20,
      backgroundColor: theme.white,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: theme.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
