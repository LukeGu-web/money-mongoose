import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import Keypad from './Keypad';
import { formatter } from 'core/utils';
import CameraBottomSheet from 'components/BottomSheet/CameraBottomSheet';

type DigitalPadProps = {
  onSubmit: () => void;
};

export default function DigitalPad({ onSubmit }: DigitalPadProps) {
  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  watch(['amount']);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? -150 : 0;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [decimalLength, setDecimalLength] = useState(0);
  const [isDecimal, setIsDecimal] = useState(false);

  useEffect(() => {
    if (Boolean(getValues('amount'))) {
      const decimal = Number(getValues('amount').split('.')[1]);
      if (decimal > 0) {
        setIsDecimal(true);
        setDecimalLength(decimal > 9 ? 2 : 1);
      }
    }
  }, []);

  const handlePriceInput = (item: string) => {
    const num: number = Math.abs(getValues('amount'));
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
        console.log('clear!');
        amount = 0;
        setDecimalLength(0);
        setIsDecimal(false);
        break;
      case '.':
        setIsDecimal(true);
        break;
      case 'camera':
        bottomSheetModalRef.current?.present();
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
    setValue('amount', amount);
  };

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
        <Pressable
          className={`justify-center p-2 rounded-lg bg-sky-600 border-2 ${
            errors.amount ? 'border-red-500' : 'border-sky-600'
          }`}
        >
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
