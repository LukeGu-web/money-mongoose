import { useState, useRef } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
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
import log from 'core/logger';
import CameraBottomSheet from 'components/BottomSheet/CameraBottomSheet';

export default function DigitalPad() {
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
        setRecord({ is_marked_tax_return: !record.is_marked_tax_return });
        break;
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

  const formatAsset = (asset: number) => {
    let curentAsset = undefined;
    if (asset) {
      const flatAssets = (getCurrentBook() as BookType).groups.flatMap(
        (group) => group.assets
      );
      const targetAsset = flatAssets.find((item) => item.id === asset);
      if (targetAsset) curentAsset = `${targetAsset.id}-${targetAsset.name}`;
    }
    return curentAsset;
  };

  const callRecordApi = (isRedirect: boolean) => {
    const { id, amount, type, category, asset, ...rest } = record;
    if (id && id > 0) {
      updateRecordApi(
        {
          id,
          ...rest,
          type: type as RecordTypes,
          category: category as string,
          asset: asset ? Number(asset.split('-')[0]) : -1,
          book: currentBook.id,
          amount: type === RecordTypes.INCOME ? amount : -amount,
        },
        {
          onSuccess: (response) => {
            log.success('Add record success:', response);

            updateRecord({
              ...response,
              amount: Number(response.amount),
            });
            handleReset();
            resetRecord();
            if (isRedirect) router.push('/');
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    } else {
      addRecordApi(
        {
          ...rest,
          type: type as RecordTypes,
          category: category as string,
          asset: asset ? Number(asset.split('-')[0]) : -1,
          book: currentBook.id,
          amount: type === RecordTypes.INCOME ? amount : -amount,
        },
        {
          onSuccess: (response) => {
            log.success('Add record success:', response);
            addRecord({
              ...response,
              amount: Number(response.amount),
            });
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

  const callTransferApi = (isRedirect: boolean) => {
    const { id, from_asset, to_asset, ...rest } = record;
    if (id && id > 0) {
      updateTransferApi(
        {
          id,
          ...rest,
          book: currentBook.id,
          from_asset: from_asset ? Number(from_asset.split('-')[0]) : -1,
          to_asset: to_asset ? Number(to_asset.split('-')[0]) : -1,
        },
        {
          onSuccess: (response) => {
            log.success('Add record success:', response);
            updateTransfer({
              ...response,
              amount: Number(response.amount),
            });
            handleReset();
            resetRecord();
            if (isRedirect) router.push('/');
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    } else {
      addTransferApi(
        {
          ...rest,
          book: currentBook.id,
          from_asset: from_asset ? Number(from_asset.split('-')[0]) : -1,
          to_asset: to_asset ? Number(to_asset.split('-')[0]) : -1,
        },
        {
          onSuccess: (response) => {
            log.success('Add record success:', response);
            addTransfer({
              ...response,
              amount: Number(response.amount),
            });
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

  const handleSubmit = (isRedirect: boolean) => {
    // const validation = RecordSchema.safeParse(record);
    // if (!validation.success) {
    //   log.error('Zod: create record: ', validation.error);
    //   let errorMsg = '';
    //   if (record.amount === 0) {
    //     errorMsg += 'Please enter an amount.';
    //   }
    //   if ('category' in validation.error.format()) {
    //     errorMsg += 'Please select a category.';
    //   }
    //   Alert.alert('Tip', errorMsg, [
    //     { text: 'OK', onPress: () => log.info('OK Pressed') },
    //   ]);
    // } else {
    log.info('Submit create record data: ', {
      ...record,
      book: currentBook.id,
    });
    if (record.type === RecordTypes.TRANSFER) {
      callTransferApi(isRedirect);
    } else {
      callRecordApi(isRedirect);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ alignItems: 'center' }}
    >
      <View className='flex-row items-start justify-between pb-2 mx-4 mb-2 border-b-2'>
        <TextInput
          placeholder='note'
          className='flex-1 p-1 mr-2 text-2xl'
          value={record.note}
          onChangeText={(value) => setRecord({ note: value })}
        />
        <TouchableOpacity className='justify-center p-2 rounded-lg bg-sky-600'>
          <Text className='text-2xl color-white'>{`A$ ${formatter(
            record.amount
          )}`}</Text>
        </TouchableOpacity>
      </View>
      <Keypad onKeyInput={handlePriceInput} />
      <CameraBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </KeyboardAvoidingView>
  );
}
