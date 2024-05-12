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
import { useGlobalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
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
    if (item !== cateL1) {
      setCateL1(item);
      setCateL2('');
    }
    if (hasSubcategory) {
      setIsVisible(true);
      if (isIncome) {
        setL2DataList(incomeCategory[item as keyof typeof incomeCategory]);
      } else {
        setL2DataList(expenseCategory[item as keyof typeof expenseCategory]);
      }
    }
  };
  const handleSelectL2Icon = (item: string) => {
    setCateL2(item);
    setIsVisible(false);
  };
  return (
    <View style={{ flex: 1 }}>
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
                <Text style={styles.modalText}>{cateL1}</Text>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <AntDesign name='closesquareo' size={24} color='black' />
                </TouchableOpacity>
              </View>
              {cateL1 !== '' && (
                <IconTable
                  data={l2DataList}
                  selectedCategory={cateL2}
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

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
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
