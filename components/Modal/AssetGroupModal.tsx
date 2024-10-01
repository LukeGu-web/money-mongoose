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
            log.success('create success:', response);
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
        <View className='items-center w-11/12 gap-6 p-6 bg-white rounded-lg'>
          <Text className='text-3xl'>
            {name === '' ? 'Create' : 'Edit'} Group
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='w-11/12 p-3 border-2 rounded-lg'
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
            <Button color='gray' title='Cancel' onPress={handleCancel} />
            <Pressable
              className='items-center justify-center w-2/5 p-2 bg-yellow-300 rounded-lg'
              onPress={handleConfirm}
            >
              {isCreating || isUpdating ? (
                <ActivityIndicator size='small' />
              ) : (
                <Text className='font-semibold'>Confirm</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
