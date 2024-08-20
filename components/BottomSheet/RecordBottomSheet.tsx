import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useDeleteRecord } from 'api/record';
import { formatApiError } from 'api/errorFormat';
import { useStyles, TColors } from 'core/theme';
import log from 'core/logger';
import { useRecord, useRecordStore } from 'core/stateHooks';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type RecordBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function RecordBottomSheet({
  bottomSheetModalRef,
}: RecordBottomSheetProps) {
  const { mutate: deleteRecordApi } = useDeleteRecord();
  const { styles, theme } = useStyles(createStyles);
  const { record, resetRecord } = useRecord();
  const { removeRecord } = useRecordStore();
  const handleGoRecord = () => {
    bottomSheetModalRef.current?.dismiss();
    router.navigate('/record');
  };
  console.log('record: ', record);
  const handleDelete = () =>
    Alert.alert(
      'Delete Record',
      `Are you sure you want to delete ${record.category} record?`,
      [
        {
          text: 'Cancel',
          onPress: () => bottomSheetModalRef.current?.dismiss(),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            deleteRecordApi(
              { id: record.id as number },
              {
                onSuccess: () => {
                  log.success('Delete asset successfully!');
                  // delete record from store
                  removeRecord(record.id as number);
                  resetRecord();
                  bottomSheetModalRef.current?.dismiss();
                },
                onError: (error) => {
                  log.error('Error: ', formatApiError(error));
                },
              }
            ),
        },
      ]
    );
  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={160}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Icon name={record.category} size={28} color='#000' />
          </View>
          <View style={styles.midContainer}>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{record.category}</Text>
              {record.subcategory && (
                <Text style={styles.category}>- {record.subcategory}</Text>
              )}
            </View>
            {record.note !== '' && <Text>{record.note}</Text>}
          </View>
          <Text style={styles.amount}>{Number(record.amount).toFixed(2)}</Text>
        </View>
        <View style={styles.functionContainer}>
          <TouchableOpacity
            className='items-center justify-center'
            onPress={handleGoRecord}
          >
            <Icon name='edit' size={24} color='#000' />
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='items-center justify-center'
            onPress={handleDelete}
          >
            <Icon name='delete' size={24} color='#000' />
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='items-center justify-center'
            onPress={handleGoRecord}
          >
            <Icon name='copy' size={24} color='#000' />
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
  });
