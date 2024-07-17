import { useCallback, useMemo, type RefObject, type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useStyles, TColors } from 'core/theme';

type RecordBottomSheetProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  children: ReactNode;
  height: number;
};

export default function BottomSheet({
  bottomSheetModalRef,
  children,
  height,
}: RecordBottomSheetProps) {
  const { styles } = useStyles(createStyles);
  const { bottom: bottomSafeArea } = useSafeAreaInsets();

  const snapPoints = useMemo(
    () => [height + bottomSafeArea, height + bottomSafeArea],
    [bottomSafeArea]
  );
  console.log('snapPoints: ', snapPoints);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          enableTouchThrough={true}
          opacity={0.2}
        />
      )}
      // onChange={handleSheetChanges}
      enableDismissOnClose
    >
      <BottomSheetView style={styles.container}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      //   backgroundColor: theme.bgPrimary,
    },
  });
