import { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { Record } from 'api/record/types';
import { useStyles, TColors } from 'core/theme';

type RecordBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function RecordBottomSheet({
  bottomSheetModalRef,
}: RecordBottomSheetProps) {
  const { styles } = useStyles(createStyles);

  const snapPoints = useMemo(() => ['30%', '30%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      style={styles.modal}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enableDismissOnClose
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      //   flex: 10,
      backgroundColor: '#000',
    },
    modal: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });
