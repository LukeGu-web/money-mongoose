import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';
import { useShallow } from 'zustand/react/shallow';

import { useStyles, TColors } from 'core/theme';
import { useAssetStore } from 'core/stateHooks';
import BottomSheet from './BottomSheet';

type EditAssetGroupBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  funtions: { [functionName: string]: () => void };
  title: string;
};

export default function EditAssetGroupBottomSheet({
  bottomSheetModalRef,
  funtions,
  title,
}: EditAssetGroupBottomSheetProps) {
  const { styles } = useStyles(createStyles);

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={240}>
      <View style={styles.container}>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.contentContainer}>
          {Object.keys(funtions).map((item, index) => (
            <TouchableOpacity
              key={item}
              style={{
                ...styles.button,
                borderBottomWidth:
                  index !== Object.keys(funtions).length - 1 ? 1 : 0,
              }}
              onPress={funtions[item]}
            >
              <Text style={styles.btnText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.cancelBtn}
          // onPress={funtions[item]}
        >
          <Text style={styles.cancelText}>Cancel</Text>
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
      width: '100%',
      borderRadius: 10,
      backgroundColor: theme.bgPrimary,
    },
    button: {
      paddingVertical: 8,
      borderColor: theme.white,
    },
    btnText: {
      textAlign: 'center',
      color: '#333',
    },
    cancelBtn: {
      width: '100%',
      borderRadius: 10,
      paddingVertical: 8,

      borderWidth: 2,
      borderColor: 'gray',
      marginTop: 8,
    },
    cancelText: {
      textAlign: 'center',
    },
  });
