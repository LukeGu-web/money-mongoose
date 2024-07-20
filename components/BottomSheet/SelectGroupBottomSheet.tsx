import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { useFormContext } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useForm, Controller } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { PickerIOS } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { useStyles, TColors } from 'core/theme';
import { useAssetGroups } from 'core/stateHooks';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type SelectGroupBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  value: string;
  onChange: (itemValue: number | string, itemIndex: number) => void;
};

export default function SelectGroupBottomSheet({
  bottomSheetModalRef,
  value,
  onChange,
}: SelectGroupBottomSheetProps) {
  const { styles, theme } = useStyles(createStyles);
  const { groups, addGroup } = useAssetGroups(
    useShallow((state) => ({
      groups: state.groups,
      addGroup: state.addGroup,
    }))
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { setValue, getValues } = useFormContext();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      groupName: '',
    },
  });

  const handleSelect = (item: string) => {
    setValue('group', item, { shouldValidate: true });
    bottomSheetModalRef.current?.dismiss();
  };

  const handleCancel = () => {
    reset();
    setIsVisible(false);
  };

  const handleConfirm = handleSubmit((data) => {
    addGroup(data.groupName);
    reset();
    setIsVisible(false);
  });

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={280}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <View style={{ width: 30 }}></View>
          <Text style={styles.headerText}>Select Group</Text>
          <MaterialCommunityIcons
            name='plus-box-multiple-outline'
            size={24}
            color='black'
            onPress={() => setIsVisible(true)}
          />
        </View>
        <View style={styles.contentContainer}>
          <PickerIOS
            selectedValue={value}
            onValueChange={onChange}
            style={{ flex: 1, width: '100%' }}
          >
            {groups.map((item) => (
              <PickerIOS.Item key={item} label={item} value={item} />
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 24 }}>Monthly Budget</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder='Enter the group name'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='groupName'
            />
            <View style={styles.buttonGroup}>
              <Button color='gray' title='Cancel' onPress={handleCancel} />
              <Button title='Confirm' onPress={handleConfirm} />
            </View>
          </View>
        </View>
      </Modal>
    </BottomSheet>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      gap: 8,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 600,
    },
    contentContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'flex-start',
    },
    titleWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    addBtn: {
      width: '100%',
      backgroundColor: 'yellow',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
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
