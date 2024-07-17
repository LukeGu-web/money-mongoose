import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { AntDesign } from '@expo/vector-icons';

import { useStyles, TColors } from 'core/theme';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type SelectGroupBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

const groups = ['Saving', 'Credit', 'Investment'];

export default function SelectGroupBottomSheet({
  bottomSheetModalRef,
}: SelectGroupBottomSheetProps) {
  const { styles, theme } = useStyles(createStyles);
  const { setValue, getValues } = useFormContext();

  const handleSelect = (item: string) => {
    setValue('group', item, { shouldValidate: true });
    bottomSheetModalRef.current?.dismiss();
  };

  const handleAddNewGroup = () => {};

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={240}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Select Group</Text>
        <View style={styles.contentContainer}>
          {groups.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.rowWrapper}
              onPress={() => handleSelect(item)}
            >
              <Text>{item}</Text>
              {item === getValues('group') ? (
                <AntDesign name='check' size={18} color='orange' />
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddNewGroup}>
          <Text style={styles.addText}>Add new group</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      padding: 8,
      gap: 8,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 600,
    },
    contentContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'lightblue',
      padding: 8,
      borderRadius: 8,
    },
    rowWrapper: {
      width: '100%',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addBtn: {
      width: '100%',
      backgroundColor: 'yellow',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
    },
    addText: {},
  });
