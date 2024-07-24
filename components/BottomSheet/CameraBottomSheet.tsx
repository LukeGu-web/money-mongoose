import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { useStyles, TColors } from 'core/theme';
import { useAssetStore } from 'core/stateHooks';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type CameraBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function CameraBottomSheet({
  bottomSheetModalRef,
}: CameraBottomSheetProps) {
  const { styles, theme } = useStyles(createStyles);
  const accounts = useAssetStore((state) => state.accounts);
  ['Gallery', 'Camera'];

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={250}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.headerText}>Select Picture</Text>
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => router.back()}
          >
            <FontAwesome name='camera-retro' size={24} color={theme.white} />
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => router.back()}
          >
            <FontAwesome5 name='photo-video' size={24} color={theme.white} />
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
        </View>
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
      gap: 16,
      marginTop: 20,
    },
    titleWrapper: {
      width: '100%',
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    button: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: 8,
      gap: 12,
    },
    buttonText: {
      fontSize: 20,
      color: theme.white,
    },
  });
