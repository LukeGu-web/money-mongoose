import React, { useCallback, useRef } from 'react';
import {
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useForm, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import RecordFrequencyBottomSheet from '../BottomSheet/RecordFrequencyBottomSheet';
import Icon from '../Icon/Icon';

export default function PeriodBuilderForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      frequency: '',
      lastName: '',
    },
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleSelectFrequency = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  //   const onSubmit = (data) => console.log(data);
  return (
    <>
      <KeyboardAwareScrollView className='p-2'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View className='h-64 p-2 bg-gray-200 rounded-lg'>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Pressable
                    className='flex-row items-center justify-between w-full h-12'
                    onPress={handleSelectFrequency}
                  >
                    <Text>Frequency</Text>
                    <View>
                      {value ? (
                        <Text>{value}</Text>
                      ) : (
                        <View className='flex-row items-center gap-1'>
                          <Text className='color-zinc-400'>
                            Select frequency
                          </Text>
                          <Icon name='arrow-right' size={14} color='#bfc0c0' />
                        </View>
                      )}
                      <RecordFrequencyBottomSheet
                        bottomSheetModalRef={bottomSheetModalRef}
                        // value={value}
                        // onChange={onChange}
                      />
                    </View>
                  </Pressable>
                )}
                name='frequency'
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </>
  );
}
