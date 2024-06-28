import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { AntDesign } from '@expo/vector-icons';
import IconTable from './IconTable';

import { RecordTypes } from 'api/record/types';
import { useRecord } from 'core/stateHooks/useRecord';
import { useStyles, TColors } from 'core/theme';

import expenseCategory from 'static/record-expense-category.json';
import incomeCategory from 'static/record-income-category.json';

const { width } = Dimensions.get('window');
const iconSize = width * 0.15;

export default function RecordCategory() {
  const { record, setRecord } = useRecord(
    useShallow((state) => ({
      record: state.record,
      setRecord: state.setRecord,
    }))
  );
  const { styles } = useStyles(createStyles);

  const [l2DataList, setL2DataList] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleSelectIcon = (item: string, hasSubcategory: boolean) => {
    if (item !== record.category) {
      setRecord({ category: item, subcategory: '' });
    }
    if (hasSubcategory) {
      setIsVisible(true);
      if (record.type === RecordTypes.INCOME) {
        setL2DataList(incomeCategory[item as keyof typeof incomeCategory]);
      } else {
        setL2DataList(expenseCategory[item as keyof typeof expenseCategory]);
      }
    }
  };
  const handleSelectL2Icon = (item: string) => {
    setRecord({ subcategory: item });
    setIsVisible(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.iconsContainer}>
        {record.type === RecordTypes.INCOME ? (
          <IconTable
            data={incomeCategory}
            selectedCategory={record.category}
            selectedSubcategory={record.subcategory}
            onSelectIcon={handleSelectIcon}
          />
        ) : (
          <IconTable
            data={expenseCategory}
            selectedCategory={record.category}
            selectedSubcategory={record.subcategory}
            onSelectIcon={handleSelectIcon}
          />
        )}
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
                <Text style={styles.modalText}>{record.category}</Text>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <AntDesign name='closesquareo' size={24} color='black' />
                </TouchableOpacity>
              </View>
              {record.category !== '' && (
                <IconTable
                  data={l2DataList}
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
