import { useState } from 'react';
import { StyleSheet, Text, View, Modal, Button, TextInput } from 'react-native';
import { useStyles, TColors } from 'core/theme';

type AssetGroupModalProps = {
  name: string;
  isVisible: boolean;
  onClose: () => void;
};

export default function AssetGroupModal({
  name,
  isVisible,
  onClose,
}: AssetGroupModalProps) {
  const { styles } = useStyles(createStyles);
  const [text, setText] = useState(name);
  const handleCancel = () => {
    onClose();
  };
  const handleConfirm = () => {
    onClose();
  };
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

          <TextInput
            style={styles.input}
            placeholder='Enter the group name'
            onChangeText={setText}
            value={text}
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
    input: {
      width: '90%',
      borderWidth: 1,
      padding: 10,
      borderRadius: 8,
    },
    buttonGroup: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  });
