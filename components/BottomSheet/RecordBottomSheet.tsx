import { Alert, View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RecordTypes } from 'api/record/types';
import { useDeleteRecord } from 'api/record';
import { formatApiError } from 'api/errorFormat';
import log from 'core/logger';
import { useRecord, useRecordStore } from 'core/stateHooks';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type RecordBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  onDismiss: () => void;
};

export default function RecordBottomSheet({
  bottomSheetModalRef,
  onDismiss,
}: RecordBottomSheetProps) {
  const { mutate: deleteRecordApi } = useDeleteRecord();
  const { record, resetRecord, setRecord } = useRecord();
  const { removeRecord } = useRecordStore();
  const handleGoRecord = () => {
    router.navigate('/record');
    bottomSheetModalRef.current?.dismiss();
  };

  const handleCopy = () => {
    setRecord({ id: -1 });
    handleGoRecord();
  };

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

  const functions: { [functionName: string]: () => void } = {
    Edit: handleGoRecord,
    Copy: handleCopy,
    Delete: handleDelete,
  };
  return (
    <BottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      height={160}
      onDismiss={onDismiss}
    >
      <View className='items-center flex-1'>
        <View className='flex-row items-center justify-between p-2 border-b-2'>
          <View className='items-center justify-center w-1/6'>
            <Icon name={record.category} size={28} color='#000' />
          </View>
          <View className='flex-1'>
            <View className='flex-row'>
              <Text className='text-lg font-bold'>{record.category}</Text>
              {record.subcategory && (
                <Text className='text-lg'>- {record.subcategory}</Text>
              )}
            </View>
            {record.is_marked_tax_return && (
              <Text>Marked as Tax Return item</Text>
            )}
            {record.note !== '' && <Text>{record.note}</Text>}
          </View>
          <View className='mr-4'>
            <Text className={`font-bold `}>
              {Number(record.amount).toFixed(2)}
            </Text>
            {record.type !== RecordTypes.TRANSFER && (
              <Text className='text-sm text-right'>
                {String(record.asset).split('-')[1]}
              </Text>
            )}
          </View>
        </View>
        <View className='flex-row items-center justify-between gap-10 px-10 py-4 mt-4 rounded-full bg-zinc-300'>
          {Object.keys(functions).map((item, index) => (
            <Pressable
              key={item}
              className='items-center justify-center'
              onPress={functions[item]}
            >
              <Icon name={item.toLowerCase()} size={24} color='#000' />
              <Text>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </BottomSheet>
  );
}
