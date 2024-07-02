import { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import Icon from 'components/Icon/Icon';
import { Record } from 'api/record/types';
import { useStyles, TColors } from 'core/theme';
import { useRecord } from 'core/stateHooks';

type RecordBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function RecordBottomSheet({
  bottomSheetModalRef,
}: RecordBottomSheetProps) {
  const { styles } = useStyles(createStyles);
  const selectedRecord = useRecord((state) => state.selectedRecord);

  console.log('selectedRecord: ', selectedRecord);
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
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          enableTouchThrough={true}
          opacity={0.2}
        />
      )}
      onChange={handleSheetChanges}
      enableDismissOnClose
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Icon name={selectedRecord.category} size={28} color='black' />
          </View>
          <View style={styles.midContainer}>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{selectedRecord.category}</Text>
              {selectedRecord.subcategory && (
                <Text style={styles.category}>
                  {' '}
                  - {selectedRecord.subcategory}
                </Text>
              )}
            </View>
            {selectedRecord.note !== '' && <Text>{selectedRecord.note}</Text>}
          </View>
          <Text style={styles.amount}>
            {Number(selectedRecord.amount).toFixed(2)}
          </Text>
        </View>
        <View></View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    contentContainer: {
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
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
    iconContainer: {
      flex: 0.1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    midContainer: {
      flex: 0.8,
    },
    categoryContainer: {
      flexDirection: 'row',
    },
    category: {
      paddingBottom: 4,
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    amount: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
