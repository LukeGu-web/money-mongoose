import { useState, useRef, useCallback } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { router } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Keypad from './Keypad';

import { RecordTypes, RecordVariablesSchema } from 'api/record/types';
import { useAddRecord } from 'api/record/useAddRecord';
import { formatApiError } from 'api/errorFormat';
import { useStyles, TColors } from 'core/theme';
import { useRecord, useRecordStore, useBookStore } from 'core/stateHooks';
import { formatter } from 'core/utils';
import log from 'core/logger';
import CameraBottomSheet from 'components/BottomSheet/CameraBottomSheet';

export default function DigitalPad() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? -150 : 0;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { mutate: addRecordApi } = useAddRecord();
  const currentBook = useBookStore((state) => state.currentBook);
  const addRecord = useRecordStore((state) => state.addRecord);
  const { record, setRecord, resetRecord } = useRecord(
    useShallow((state) => ({
      record: state.record,
      setRecord: state.setRecord,
      resetRecord: state.resetRecord,
    }))
  );

  const { styles } = useStyles(createStyles);

  const [decimalLength, setDecimalLength] = useState(0);
  const [isDecimal, setIsDecimal] = useState(false);

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleReset = () => {
    setDecimalLength(0);
    setIsDecimal(false);
  };

  const handlePriceInput = (item: string) => {
    const num: number = record.amount;
    let newAmount: number = num;
    switch (item) {
      case 'delete':
        if (num === 0) {
          setIsDecimal(false);
          setDecimalLength(0);
        } else {
          const integer = String(num).split('.')[0];
          const decimal = String(num).split('.')[1] ?? 0;
          switch (decimalLength) {
            case 0:
              if (integer.length >= 1) {
                newAmount = Number(integer.slice(0, -1) + '.' + decimal);
              }
              break;
            case 1:
              newAmount = num - Number(decimal[0]) / 10;
              setDecimalLength(0);
              setIsDecimal(false);
              break;
            case 2:
              newAmount = Number((num - Number(decimal[1]) / 100).toFixed(2));
              setDecimalLength(1);
              break;
          }
        }
        break;
      case 'clear':
        newAmount = 0;
        setIsDecimal(false);
        setDecimalLength(0);
        break;
      case '.':
        setIsDecimal(true);
        break;
      case 'camera':
        bottomSheetModalRef.current?.present();
        break;
      case 'tax':
        break;
      // case 'new':
      //   handleSubmit(false);
      //   break;
      case 'save':
        handleSubmit(true);
        break;
      default:
        if (isDecimal) {
          if (decimalLength === 0) {
            newAmount = num + Number(item) / 10;
            setDecimalLength(1);
          } else if (decimalLength === 1) {
            newAmount = Number((num + Number(item) / 100).toFixed(2));
            setDecimalLength(2);
          } else {
            newAmount = num;
          }
        } else {
          newAmount = Number(num + item);
        }
        break;
    }
    setRecord({ amount: newAmount });
  };

  const handleSubmit = (isRedirect: boolean) => {
    const validation = RecordVariablesSchema.safeParse(record);
    log.error('Zod: create record: ', validation.error);
    if (!validation.success) {
      let errorMsg = '';
      if (record.amount === 0) {
        errorMsg += 'Please enter an amount.';
      }
      if ('category' in validation.error.format()) {
        errorMsg += 'Please select a category.';
      }
      Alert.alert('Tip', errorMsg, [
        { text: 'OK', onPress: () => log.info('OK Pressed') },
      ]);
    } else {
      addRecordApi(
        {
          ...record,
          book: currentBook.id,
          amount:
            record.type === RecordTypes.INCOME ? record.amount : -record.amount,
        },
        {
          onSuccess: (response) => {
            log.success('Add record success:', response);
            addRecord(response);
            handleReset();
            resetRecord();
            if (isRedirect) router.push('/');
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
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
          <Text style={styles.amountText}>{`A$ ${formatter(
            record.amount
          )}`}</Text>
        </TouchableOpacity>
      </View>
      <Keypad onKeyInput={handlePriceInput} />
      <CameraBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
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
      marginBottom: 8,
      paddingBottom: 8,
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
      padding: 8,
      backgroundColor: theme.secondary,
      justifyContent: 'center',
    },
    amountText: {
      color: theme.white,
      fontSize: 24,
    },
  });
