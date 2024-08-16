import { StyleSheet, Text, View, Modal, Button, TextInput } from 'react-native';
import { useForm, useFormContext, Controller } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { BookType } from 'api/types';
import { useCreateAssetGroup, useUpdateAssetGroup } from 'api/asset';
import { formatApiError } from 'api/errorFormat';
import { useBookStore } from 'core/stateHooks';
import { useStyles, TColors } from 'core/theme';

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
  const { styles } = useStyles(createStyles);
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
            console.log('create success:', response);
            addAssetGroup(response);
            reset();
            onClose();
          },
          onError: (error) => {
            console.log('error: ', formatApiError(error));
          },
        }
      );
    } else {
      updateAssetGroupApi(
        { ...data, id: groupId as number },
        {
          onSuccess: (response) => {
            console.log('update success:', response);
            updateAssetGroup(response);
            reset();
            onClose();
          },
          onError: (error) => {
            console.log('error: ', formatApiError(error));
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 24 }}>
            {name === '' ? 'Create' : 'Edit'} Group
          </Text>
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
          <View style={styles.buttonGroup}>
            <Button color='gray' title='Cancel' onPress={handleCancel} />
            <Button title='Confirm' onPress={handleConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      height: '100%',
    },
    modalView: {
      width: '90%',
      backgroundColor: theme.white,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: theme.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      gap: 16,
    },
    // input: {
    //   width: '90%',
    //   borderWidth: 1,
    //   padding: 10,
    //   borderRadius: 8,
    // },
    buttonGroup: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  });
