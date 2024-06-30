import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';
import Keypad from './Keypad';

import { RecordTypes, RecordVariablesSchema } from 'api/record/types';
import { useAddRecord } from 'api/record/useAddRecord';
import { formatApiError } from 'api/errorFormat';
import { useStyles, TColors } from 'core/theme';
import { useRecord, useRecordStore } from 'core/stateHooks';

export default function DigitalPad() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? -150 : 0;

  const { mutate: addRecordApi } = useAddRecord();
  const addRecord = useRecordStore((state) => state.addRecord);
  const { record, setRecord, resetRecord } = useRecord(
    useShallow((state) => ({
      record: state.record,
      setRecord: state.setRecord,
      resetRecord: state.resetRecord,
    }))
  );

  const { theme, styles } = useStyles(createStyles);

  const [integer, setInteger] = useState('0');
  const [decimal, setDecimal] = useState('00');
  const [decimalLength, setDecimalLength] = useState(0);
  const [isDecimal, setIsDecimal] = useState(false);

  const handleReset = () => {
    setInteger('0');
    setDecimal('00');
    setDecimalLength(0);
    setIsDecimal(false);
  };

  const handlePriceInput = (item: string) => {
    switch (item) {
      case 'delete':
        if (integer === '0' && decimal === '00') {
          setIsDecimal(false);
          setDecimalLength(0);
        }
        if (decimal[1] !== '0') {
          setDecimal(decimal[0] + '0');
          setDecimalLength(1);
        } else if (decimal[0] !== '0') {
          setDecimal('00');
          setDecimalLength(0);
        } else if (integer.length === 1 && integer !== '0') {
          setInteger('0');
        } else if (integer.length > 1) {
          setInteger(integer.slice(0, -1));
        }
        break;
      case 'clear':
        setInteger('0');
        setDecimal('00');
        setIsDecimal(false);
        setDecimalLength(0);
        break;
      case '.':
        setIsDecimal(true);
        break;
      case 'calculator':
        break;
      case 'new':
        handleSubmit(false);
        break;
      case 'save':
        handleSubmit(true);
        break;
      default:
        let amount = 0;

        if (isDecimal) {
          if (decimalLength === 0) {
            const newDecimal = String(item) + '0';
            setDecimal(newDecimal);
            amount = parseFloat(`${integer}.${newDecimal}`);
            setDecimalLength(1);
          } else if (decimalLength === 1) {
            const newDecimal = decimal[0] + String(item);
            setDecimal(newDecimal);
            amount = parseFloat(`${integer}.${decimal}`);
            setDecimalLength(2);
          }
        } else {
          if (integer === '0') {
            setInteger(String(item));
            amount = parseFloat(`${item}.${decimal}`);
          } else {
            setInteger(integer + String(item));
            amount = parseFloat(`${integer + String(item)}.${decimal}`);
          }
        }
        setRecord({ amount });
        break;
    }
  };

  const handleSubmit = (isRedirect: boolean) => {
    const validation = RecordVariablesSchema.safeParse(record);
    if (!validation.success) {
      let errorMsg = '';
      if (record.amount === 0) {
        errorMsg += 'Please enter an amount.';
      }
      if ('category' in validation.error.format()) {
        errorMsg += 'Please select a category.';
      }
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Missing field:',
        text2: errorMsg,
      });
    } else {
      addRecordApi(
        {
          ...record,
          amount:
            record.type === RecordTypes.INCOME ? record.amount : -record.amount,
        },
        {
          onSuccess: (response) => {
            console.log('submit success:', response);
            addRecord(response);
            handleReset();
            resetRecord();
            if (isRedirect) router.push('/');
          },
          onError: (error) => {
            console.log('error: ', formatApiError(error));
          },
        }
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.container}
    >
      <View style={styles.noteContainer}>
        <TextInput
          placeholder='note'
          style={styles.noteInput}
          value={record.note}
          onChangeText={(value) => setRecord({ note: value })}
        />
        <TouchableOpacity style={styles.amount}>
          <Text style={styles.amountText}>{`A$ ${integer}.${decimal}`}</Text>
        </TouchableOpacity>
      </View>
      {/* <View>function tags</View> */}
      <Keypad onKeyInput={handlePriceInput} />
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    noteContainer: {
      height: 50,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginHorizontal: 16,
      borderBottomWidth: 1,
      marginBottom: 6,
      paddingBottom: 6,
    },
    noteInput: {
      flex: 1,
      height: '100%',
      fontSize: 24,
      padding: 4,
      marginRight: 10,
    },
    amount: {
      borderRadius: 8,
      height: '100%',
      padding: 6,
      backgroundColor: theme.secondary,
      justifyContent: 'center',
    },
    amountText: {
      color: theme.white,
      fontSize: 24,
    },
  });
