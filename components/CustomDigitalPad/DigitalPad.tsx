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
import { useFormContext, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';
import Keypad from './Keypad';

import { RecordTypes, RecordVariablesSchema } from 'api/record/types';
import { useAddRecord } from 'api/record/useAddRecord';
import { formatApiError } from 'api/errorFormat';
import { useStyles, TColors } from 'core/theme';
import { formatter } from 'core/utils';
import { useRecord, useRecordStore } from 'core/stateHooks';

const keyboardVerticalOffset = Platform.OS === 'ios' ? -150 : 0;

type DigitalPadProps = {
  onSubmit: () => void;
};

export default function DigitalPad({ onSubmit }: DigitalPadProps) {
  const { styles } = useStyles(createStyles);
  const { mutate: addRecordApi } = useAddRecord();

  const addRecord = useRecordStore((state) => state.addRecord);
  const { record, setRecord, resetRecord } = useRecord(
    useShallow((state) => ({
      record: state.record,
      setRecord: state.setRecord,
      resetRecord: state.resetRecord,
    }))
  );
  const { control, watch, getValues, setValue } = useFormContext();
  watch(['amount']);
  const [decimalLength, setDecimalLength] = useState(0);
  const [isDecimal, setIsDecimal] = useState(false);

  const handleReset = () => {
    setDecimalLength(0);
    setIsDecimal(false);
  };

  const handlePriceInput = (item: string) => {
    const num: number = getValues('amount');
    let amount: number = num;
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
              if (integer.length > 1) {
                amount = Number(integer.slice(0, -1) + '.' + decimal);
              }
              break;
            case 1:
              amount = num - Number(decimal[0]) / 10;
              setDecimalLength(0);
              setIsDecimal(false);
              break;
            case 2:
              amount = Number((num - Number(decimal[1]) / 100).toFixed(2));
              setDecimalLength(1);
              break;
          }
        }
        break;
      case 'clear':
        setIsDecimal(false);
        setDecimalLength(0);
        break;
      case '.':
        setIsDecimal(true);
        break;
      case 'calculator':
        break;
      case 'new':
        // handleSubmit(false);
        onSubmit();
        break;
      case 'save':
        onSubmit();
        // handleSubmit(true);
        break;
      default:
        if (isDecimal) {
          if (decimalLength === 0) {
            amount = num + Number(item) / 10;
            setDecimalLength(1);
          } else if (decimalLength === 1) {
            amount = Number((num + Number(item) / 100).toFixed(2));
            setDecimalLength(2);
          } else {
            amount = num;
          }
        } else {
          amount = Number(num + item);
        }
        break;
    }
    setValue('amount', amount, { shouldValidate: true });
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

  console.log('num: ', getValues('amount'));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.container}
    >
      <View style={styles.noteContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder='note'
              style={styles.noteInput}
              value={value}
              onChangeText={onChange}
            />
          )}
          name='note'
        />
        <TouchableOpacity style={styles.amount}>
          <Text style={styles.amountText}>{`A$ ${formatter(
            getValues('amount')
          )}`}</Text>
        </TouchableOpacity>
      </View>
      {/* <View>function tags</View> */}
      <Controller
        control={control}
        rules={{
          min: {
            value: 0.01,
            message: 'Please enter an amount.',
          },
        }}
        render={() => <Keypad onKeyInput={handlePriceInput} />}
        name='amount'
      />
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
