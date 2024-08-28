import { useState, useRef } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useShallow } from 'zustand/react/shallow';
import Keypad from './Keypad';

import { BookType } from 'api/types';
import { RecordTypes, RecordSchema } from 'api/record/types';
import {
  useAddRecord,
  useUpdateRecord,
  useAddTransfer,
  useUpdateTransfer,
} from 'api/record';
import { formatApiError } from 'api/errorFormat';
import { useRecord, useRecordStore, useBookStore } from 'core/stateHooks';
import { formatter } from 'core/utils';

import CameraBottomSheet from 'components/BottomSheet/CameraBottomSheet';

type DigitalPadProps = {
  onSubmit: () => void;
};

export default function DigitalPad({ onSubmit }: DigitalPadProps) {
  const { control, watch, getValues, setValue } = useFormContext();
  watch(['amount']);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? -150 : 0;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { mutate: addRecordApi } = useAddRecord();
  const { mutate: updateRecordApi } = useUpdateRecord();
  const { mutate: addTransferApi } = useAddTransfer();
  const { mutate: updateTransferApi } = useUpdateTransfer();
  const { currentBook, getCurrentBook } = useBookStore();
  const { addRecord, updateRecord, addTransfer, updateTransfer } =
    useRecordStore(
      useShallow((state) => ({
        addRecord: state.addRecord,
        updateRecord: state.updateRecord,
        addTransfer: state.addTransfer,
        updateTransfer: state.updateTransfer,
      }))
    );
  const { record, setRecord, resetRecord } = useRecord();

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
              console.log('integer: ', integer);
              if (integer.length > 0) {
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
      case 'calculator':
        break;
      case 'tax':
        setValue('is_marked_tax_return', !getValues('is_marked_tax_return'));
        break;
      case 'save':
        onSubmit();
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

  // const callRecordApi = (isRedirect: boolean) => {
  //   const { id, amount, type, category, asset, ...rest } = record;
  //   const data: any = {
  //     ...rest,
  //     type: type as RecordTypes,
  //     category: category as string,
  //     asset: asset ? Number(asset.split('-')[0]) : undefined,
  //     book: currentBook.id,
  //     amount: type === RecordTypes.INCOME ? amount : -amount,
  //   };
  //   if (id && id > 0) {
  //     updateRecordApi(
  //       {
  //         id,
  //         ...data,
  //       },
  //       {
  //         onSuccess: (response) => {
  //           log.success('Add record success:', response);

  //           updateRecord({
  //             ...response,
  //             amount: Number(response.amount),
  //           });
  //           handleReset();
  //           resetRecord();
  //           if (isRedirect) router.push('/');
  //         },
  //         onError: (error) => {
  //           log.error('Error: ', formatApiError(error));
  //         },
  //       }
  //     );
  //   } else {
  //     addRecordApi(
  //       { ...data },
  //       {
  //         onSuccess: (response) => {
  //           log.success('Add record success:', response);
  //           addRecord({
  //             ...response,
  //             amount: Number(response.amount),
  //           });
  //           handleReset();
  //           resetRecord();
  //           if (isRedirect) router.push('/');
  //         },
  //         onError: (error) => {
  //           log.error('Error: ', formatApiError(error));
  //         },
  //       }
  //     );
  //   }
  // };

  // const callTransferApi = (isRedirect: boolean) => {
  //   const { id, from_asset, to_asset, ...rest } = record;
  //   const data: any = {
  //     ...rest,
  //     book: currentBook.id,
  //     from_asset: Number(String(from_asset).split('-')[0]),
  //     to_asset: Number(String(to_asset).split('-')[0]),
  //   };
  //   if (id && id > 0) {
  //     updateTransferApi(
  //       {
  //         id,
  //         ...data,
  //       },
  //       {
  //         onSuccess: (response) => {
  //           log.success('Add record success:', response);
  //           updateTransfer({
  //             ...response,
  //             amount: Number(response.amount),
  //           });
  //           handleReset();
  //           resetRecord();
  //           if (isRedirect) router.push('/');
  //         },
  //         onError: (error) => {
  //           log.error('Error: ', formatApiError(error));
  //         },
  //       }
  //     );
  //   } else {
  //     addTransferApi(
  //       {
  //         ...data,
  //       },
  //       {
  //         onSuccess: (response) => {
  //           log.success('Add record success:', response);
  //           addTransfer({
  //             ...response,
  //             amount: Number(response.amount),
  //           });
  //           handleReset();
  //           resetRecord();
  //           if (isRedirect) router.push('/');
  //         },
  //         onError: (error) => {
  //           log.error('Error: ', formatApiError(error));
  //         },
  //       }
  //     );
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ alignItems: 'center' }}
    >
      <View className='flex-row items-start justify-between pb-2 mx-4 mb-2 border-b-2'>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder='note'
              className='flex-1 p-1 mr-2 text-2xl'
              value={value}
              onChangeText={onChange}
            />
          )}
          name='note'
        />
        <Pressable className='justify-center p-2 rounded-lg bg-sky-600'>
          <Text className='text-2xl color-white'>{`A$ ${formatter(
            Math.abs(getValues('amount'))
          )}`}</Text>
        </Pressable>
      </View>
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
      <CameraBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </KeyboardAvoidingView>
  );
}
