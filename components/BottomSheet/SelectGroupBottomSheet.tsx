import { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useForm, useFormContext, Controller } from 'react-hook-form';
import { PickerIOS } from '@react-native-picker/picker';

import { useGetGroupedAssets, useCreateAssetGroup } from 'api/asset';
import { formatApiError } from 'api/errorFormat';
import { useBookStore, useSettingStore } from 'core/stateHooks';
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
  const theme = useSettingStore((state) => state.theme);
  const currentBook = useBookStore((state) => state.currentBook);
  const { data } = useGetGroupedAssets({
    variables: { book_id: currentBook.id },
  });
  const { mutate: addAssetGroupApi, isPending } = useCreateAssetGroup();
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
      { ...data, book: currentBook.id },
      {
        onSuccess: (response) => {
          log.success('Add asset success:', response);
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
          <Text className='text-xl font-bold dark:color-white'>
            Select Group
          </Text>
          <Icon
            name='plus-box-multiple'
            size={24}
            color={theme === 'dark' ? 'white' : 'black'}
            onPress={() => setIsVisible(true)}
          />
        </View>
        <View className='items-start flex-1 w-full'>
          <PickerIOS
            selectedValue={value}
            onValueChange={onChange}
            style={{ flex: 1, width: '100%' }}
            itemStyle={{ color: theme === 'dark' ? 'white' : 'black' }}
          >
            {data?.groups.map((item) => (
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
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <View className='items-center w-11/12 gap-6 p-6 bg-white rounded-lg dark:bg-zinc-600'>
            <Text className='text-3xl dark:color-white'>Group Name</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='w-11/12 p-3 border-2 rounded-lg border-zinc-600 dark:color-white dark:border-zinc-200'
                  placeholder='Enter the group name'
                  placeholderTextColor='#a1a1aa'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='name'
            />
            <View className='flex-row w-11/12 justify-evenly'>
              {/* <Button color='gray' title='Cancel' onPress={handleCancel} />
              <Button title='Confirm' onPress={handleConfirm} /> */}
              <Pressable
                onPress={handleCancel}
                className='items-center justify-center px-6 py-2 bg-gray-400 rounded-lg '
              >
                <Text className='text-xl color-white'>Cancel</Text>
              </Pressable>
              <Pressable
                disabled={isPending}
                onPress={handleConfirm}
                className='items-center justify-center px-6 py-2 rounded-lg bg-amber-400'
              >
                {isPending ? (
                  <ActivityIndicator size='small' color='white' />
                ) : (
                  <Text className='text-xl color-white'>Confirm</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </BottomSheet>
  );
}
