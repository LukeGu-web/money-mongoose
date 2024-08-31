import { Text, View, Modal, Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { BookType } from 'api/types';
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
  const { mutate: addAssetGroupApi } = useCreateAssetGroup();
  const { mutate: updateAssetGroupApi } = useUpdateAssetGroup();
  const { getCurrentBook, addAssetGroup, updateAssetGroup } = useBookStore();

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
        { ...data, book: (getCurrentBook() as BookType).id },
        {
          onSuccess: (response) => {
            log.success('create success:', response);
            addAssetGroup(response);
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
            updateAssetGroup(response);
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
                autoFocus={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name='name'
          />
          <View className='flex-row w-4/5 justify-evenly'>
            <Button color='gray' title='Cancel' onPress={handleCancel} />
            <Button title='Confirm' onPress={handleConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
