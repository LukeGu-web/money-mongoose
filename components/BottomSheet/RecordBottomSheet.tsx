import { Alert, View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import dayjs from 'dayjs';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RecordTypes } from 'api/record/types';
import { useDeleteRecord } from 'api/record';
import { formatApiError } from 'api/errorFormat';
import log from 'core/logger';
import { useRecord, useSettingStore } from 'core/stateHooks';
import allCategories from 'static/categories.json';
import BottomSheet from './BottomSheet';
import Entypo from '@expo/vector-icons/Entypo';
import Icon from '../Icon/Icon';
import CIcon from '../Icon/CIcon';
import { successToaster } from 'core/toaster';

type RecordBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  onDismiss: () => void;
};

export default function RecordBottomSheet({
  bottomSheetModalRef,
  onDismiss,
}: RecordBottomSheetProps) {
  const theme = useSettingStore((state) => state.theme);
  const { mutate: deleteRecordApi } = useDeleteRecord();
  const { record, resetRecord, setRecord } = useRecord();
  const handleGoRecord = () => {
    router.push('/record');
    bottomSheetModalRef.current?.dismiss();
  };

  const handleEdit = () => {
    const timezoneOffset = new Date().getTimezoneOffset();
    const offsetHours = Math.floor(timezoneOffset / 60);
    const tzDate = dayjs(record.date).add(offsetHours, 'hour').toDate();
    setRecord({ date: tzDate });
    handleGoRecord();
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
                  successToaster('Delete asset successfully!');
                  log.success('Delete asset successfully!');
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
    Edit: handleEdit,
    Copy: handleCopy,
    Delete: handleDelete,
  };
  return (
    <BottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      height={200}
      onDismiss={onDismiss}
    >
      <View className='items-center flex-1'>
        <View className='flex-row items-start justify-between h-24 p-2 border-b-2 dark:border-zinc-300'>
          <View className='items-center justify-center w-1/6'>
            {!allCategories.includes(String(record.category)) ? (
              <Entypo
                name='new'
                size={28}
                color={theme === 'dark' ? 'white' : 'black'}
              />
            ) : (
              <CIcon
                // @ts-ignore: ignore json type
                name={`c-${record.category}`}
                size={28}
                color={theme === 'dark' ? 'white' : 'black'}
              />
            )}
          </View>
          <View className='flex-1'>
            <View className='flex-row'>
              <Text className='text-lg font-bold dark:color-white'>
                {record.category}
              </Text>
              {record.subcategory && (
                <Text className='text-lg dark:color-white'>
                  - {record.subcategory}
                </Text>
              )}
            </View>
            {record.is_marked_tax_return && (
              <Text className='dark:color-white'>
                Marked as Tax Return item
              </Text>
            )}
            {record.note !== '' && (
              <Text
                className='dark:color-white'
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {record.note}
              </Text>
            )}
          </View>
          <View className='mr-4'>
            <Text className={`font-bold dark:color-white`}>
              {Number(record.amount).toFixed(2)}
            </Text>
            {record.type !== RecordTypes.TRANSFER && (
              <Text className='text-sm text-right dark:color-white'>
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
