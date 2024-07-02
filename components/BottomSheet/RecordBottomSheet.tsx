import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AntDesign, Feather } from '@expo/vector-icons';

import Icon from 'components/Icon/Icon';
import { useStyles, TColors } from 'core/theme';
import { useRecord } from 'core/stateHooks';
import BottomSheet from './BottomSheet';

type RecordBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function RecordBottomSheet({
  bottomSheetModalRef,
}: RecordBottomSheetProps) {
  const { styles } = useStyles(createStyles);
  const selectedRecord = useRecord((state) => state.selectedRecord);

  console.log('selectedRecord: ', selectedRecord);
  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Icon name={selectedRecord.category} size={28} color='black' />
          </View>
          <View style={styles.midContainer}>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{selectedRecord.category}</Text>
              {selectedRecord.subcategory && (
                <Text style={styles.category}>
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
        <View style={styles.functionContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name='edit' size={24} color='black' />
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name='delete' size={24} color='black' />
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name='copy' size={24} color='black' />
            <Text>Copy</Text>
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
      alignItems: 'center',
    },
    contentContainer: {
      //   flex: 1,
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
    functionContainer: {
      gap: 40,
      height: 70,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.bgSecondary,
      marginVertical: 16,
      paddingVertical: 10,
      paddingHorizontal: 28,
      borderRadius: 40,
    },
    iconButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
