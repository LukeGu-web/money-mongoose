import { Alert, View, Text, Pressable } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { queryClient } from 'api/api-provider';
import { useDeleteBook } from 'api/book';
import { formatApiError } from 'api/errorFormat';
import { useBookStore, useBook } from 'core/stateHooks';
import log from 'core/logger';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type BookBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function BookBottomSheet({
  bottomSheetModalRef,
}: BookBottomSheetProps) {
  const { setCurrentBook, currentBook } = useBookStore();
  const book = useBook((state) => state.book);
  const { mutate: deleteBookApi } = useDeleteBook();

  const handleSelectCurrentBook = () => {
    bottomSheetModalRef.current?.dismiss();
    setCurrentBook(book);
    queryClient.refetchQueries({
      queryKey: ['records', book.id],
    });
  };

  const handleEditSelectedBook = async () => {
    bottomSheetModalRef.current?.dismiss();
    router.navigate('/book/details');
  };

  const handleDeleteBook = () => {
    if (book.id === currentBook.id) {
      return Alert.alert(
        'Delete current book',
        `You cannot delete your current book. You have to switch to another book first.`,
        [
          {
            text: 'Ok',
            onPress: () => bottomSheetModalRef.current?.dismiss(),
          },
        ]
      );
    }
    return Alert.alert(
      'Delete this book',
      `Are you sure you want to delete ${book.name}?`,
      [
        {
          text: 'Cancel',
          onPress: () => bottomSheetModalRef.current?.dismiss(),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => onDeleteBook() },
      ]
    );
  };

  const onDeleteBook = () => {
    deleteBookApi(
      { id: book.id },
      {
        onSuccess: () => {
          log.success('Delete book successfully!');
          router.navigate('/book/management');
        },
        onError: (error) => {
          log.error('Error: ', formatApiError(error));
        },
      }
    );
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={270}>
      <View className='items-center justify-between w-full gap-4 px-4'>
        <View className='flex-row w-full p-4'>
          <Text className='text-2xl font-bold'>{book.name}</Text>
        </View>
        <View className='items-center justify-between w-full gap-4 px-4'>
          <Pressable
            className='flex-row items-center justify-center w-full gap-4 py-3 bg-blue-500 rounded-lg'
            onPress={handleSelectCurrentBook}
          >
            <Feather name='check-circle' size={16} color='#fff' />
            <Text className='text-lg color-white'>Select</Text>
          </Pressable>
          <Pressable
            className='flex-row items-center justify-center w-full gap-4 py-3 bg-blue-500 rounded-lg'
            onPress={handleEditSelectedBook}
          >
            <Icon name='edit' size={16} color='#fff' />
            <Text className='text-lg color-white'>Edit</Text>
          </Pressable>
          <Pressable
            className='flex-row items-center justify-center w-full gap-4 py-3 bg-red-500 rounded-lg'
            onPress={handleDeleteBook}
          >
            <Icon name='delete' size={16} color='#fff' />
            <Text className='text-lg color-white'>Delete</Text>
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
}
