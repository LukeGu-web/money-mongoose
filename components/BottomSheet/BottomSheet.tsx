import { useMemo, type RefObject, type ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

type RecordBottomSheetProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  children: ReactNode;
  height: number;
  onDismiss?: () => void;
};

export default function BottomSheet({
  bottomSheetModalRef,
  children,
  height,
  onDismiss,
}: RecordBottomSheetProps) {
  const { bottom: bottomSafeArea } = useSafeAreaInsets();

  const snapPoints = useMemo(
    () => [height + bottomSafeArea, height + bottomSafeArea],
    [bottomSafeArea]
  );

  // const handleSheetChanges = useCallback((index: number) => {
  //   log.success('handleSheetChanges', index);
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
      onDismiss={onDismiss}
    >
      <BottomSheetView className='items-center flex-1'>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}
