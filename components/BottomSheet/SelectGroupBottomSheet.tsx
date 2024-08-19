import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useForm, useFormContext, Controller } from 'react-hook-form';
import { PickerIOS } from '@react-native-picker/picker';

import { BookType } from 'api/types';
import { useCreateAssetGroup } from 'api/asset';
import { formatApiError } from 'api/errorFormat';
import { useBookStore } from 'core/stateHooks';
import log from 'core/logger';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type SelectGroupBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  value: string;
  onChange: (itemValue: number | string, itemIndex: number) => void;
  onDismiss?: () => void;
};

export default function SelectGroupBottomSheet({
  bottomSheetModalRef,
  value,
  onChange,
  onDismiss,
}: SelectGroupBottomSheetProps) {
  const { getCurrentBook, addAssetGroup } = useBookStore();
  const { mutate: addAssetGroupApi } = useCreateAssetGroup();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { setValue } = useFormContext();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const handleCancel = () => {
    reset();
    setIsVisible(false);
  };

  const handleConfirm = handleSubmit((data) => {
    addAssetGroupApi(
      { ...data, book: (getCurrentBook() as BookType).id },
      {
        onSuccess: (response) => {
          log.success('submit success:', response);
          addAssetGroup(response);
          setValue('group', `${response.id}-${response.name}`);
          reset();
          setIsVisible(false);
        },
        onError: (error) => {
          log.error('Error: ', formatApiError(error));
        },
      }
    );
  });

  return (
    <BottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      height={280}
      onDismiss={onDismiss}
    >
      <View className='items-center justify-between flex-1 w-full gap-2 px-2'>
        <View className='flex-row items-center justify-between w-full px-3'>
          <View style={{ width: 30 }}></View>
          <Text className='text-xl font-bold'>Select Group</Text>
          <Icon
            name='plus-box-multiple'
            size={24}
            color='black'
            onPress={() => setIsVisible(true)}
          />
        </View>
        <View className='items-start flex-1 w-full'>
          <PickerIOS
            selectedValue={value}
            onValueChange={onChange}
            style={{ flex: 1, width: '100%' }}
          >
            {getCurrentBook()?.groups.map((item) => (
              <PickerIOS.Item
                key={item.id}
                label={item.name}
                value={`${item.id}-${item.name}`}
              />
            ))}
          </PickerIOS>
        </View>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
      >
        <View
          className='items-center justify-center h-full'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <View className='items-center w-11/12 gap-6 p-6 bg-white rounded-lg'>
            <Text style={{ fontSize: 24 }}>Group Name</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='w-11/12 p-3 border-2 rounded-md'
                  placeholder='Enter the group name'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='name'
            />
            <View className='flex-row w-11/12 justify-evenly'>
              <Button color='gray' title='Cancel' onPress={handleCancel} />
              <Button title='Confirm' onPress={handleConfirm} />
            </View>
          </View>
        </View>
      </Modal>
    </BottomSheet>
  );
}
