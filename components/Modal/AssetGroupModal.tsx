import {
  Text,
  View,
  Modal,
  Button,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { useCreateAssetGroup, useUpdateAssetGroup } from 'api/asset';
import { formatApiError } from 'api/errorFormat';
import { useBookStore } from 'core/stateHooks';
import log from 'core/logger';
import { successToaster } from 'core/toaster';

type AssetGroupModalProps = {
  groupId?: number;
  name: string;
  isVisible: boolean;
  onClose: () => void;
};

export default function AssetGroupModal({
  groupId,
  name,
  isVisible,
  onClose,
}: AssetGroupModalProps) {
  const { mutate: addAssetGroupApi, isPending: isCreating } =
    useCreateAssetGroup();
  const { mutate: updateAssetGroupApi, isPending: isUpdating } =
    useUpdateAssetGroup();
  const currentBook = useBookStore((state) => state.currentBook);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = handleSubmit((data) => {
    if (name === '') {
      addAssetGroupApi(
        { ...data, book: currentBook.id },
        {
          onSuccess: (response) => {
            successToaster('Add asset group successfully');
            log.success('create asset group success:', response);
            reset();
            onClose();
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    } else {
      updateAssetGroupApi(
        { ...data, id: groupId as number },
        {
          onSuccess: (response) => {
            successToaster('Update asset group successfully');
            log.success('update success:', response);
            reset();
            onClose();
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    }
  });

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        className='items-center justify-center h-full'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <View className='items-center w-11/12 gap-6 p-6 bg-white rounded-lg dark:bg-zinc-600'>
          <Text className='text-3xl dark:color-white'>
            {name === '' ? 'Create' : 'Edit'} Group
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='w-11/12 p-3 border-2 rounded-lg border-zinc-600 dark:border-zinc-200 dark:color-white'
                placeholder='Enter the group name'
                placeholderTextColor='#a1a1aa'
                autoFocus={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name='name'
          />
          <View className='flex-row justify-between w-4/5'>
            <Pressable
              onPress={handleCancel}
              className='items-center justify-center px-6 py-2 bg-gray-400 rounded-lg '
            >
              <Text className='text-xl color-white'>Cancel</Text>
            </Pressable>
            <Pressable
              className='items-center justify-center px-6 py-2 rounded-lg bg-amber-400'
              onPress={handleConfirm}
            >
              {isCreating || isUpdating ? (
                <ActivityIndicator size='small' color='white' />
              ) : (
                <Text className='text-xl color-white'>Confirm</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
