import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useShallow } from 'zustand/react/shallow';

import { BookType } from 'api/types';
import { useDeleteBook } from 'api/book';
import { formatApiError } from 'api/errorFormat';
import { useBookStore } from 'core/stateHooks';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type BookBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function BookBottomSheet({
  bottomSheetModalRef,
}: BookBottomSheetProps) {
  const { books, selectedBook, setCurrentBook, setBooks } = useBookStore();
  const { mutate: deleteBookApi } = useDeleteBook();

  const handleSelectCurrentBook = () => {
    bottomSheetModalRef.current?.dismiss();
    const book = selectedBook as BookType;
    setCurrentBook(book.id, book.name);
  };

  const handleEditSelectedBook = async () => {
    bottomSheetModalRef.current?.dismiss();
    router.navigate('/book/details');
  };

  const handleDeleteBook = () =>
    Alert.alert(
      'Delete this book',
      `Are you sure you want to delete ${selectedBook?.name}?`,
      [
        {
          text: 'Cancel',
          onPress: () => bottomSheetModalRef.current?.dismiss(),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => onDeleteBook() },
      ]
    );

  const onDeleteBook = () => {
    deleteBookApi(
      { id: (selectedBook as BookType).id },
      {
        onSuccess: (response) => {
          console.log('submit success:', response);
          // remove book from store
          const newBooks = books.filter(
            (item) => item.id !== (selectedBook as BookType).id
          );
          setBooks(newBooks);
          router.navigate('/book/book-management');
        },
        onError: (error) => {
          console.log('error: ', formatApiError(error));
        },
      }
    );
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={270}>
      <View className='items-center justify-between w-full gap-4 px-4'>
        <View className='flex-row w-full p-4'>
          <Text className='text-2xl font-bold'>{selectedBook?.name}</Text>
        </View>
        <View className='items-center justify-between w-full gap-4 px-4'>
          <TouchableOpacity
            className='flex-row items-center justify-center w-full gap-4 py-3 bg-blue-500 rounded-md'
            onPress={handleSelectCurrentBook}
          >
            <Feather name='check-circle' size={16} color='#fff' />
            <Text className='text-lg color-white'>Select</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='flex-row items-center justify-center w-full gap-4 py-3 bg-blue-500 rounded-md'
            onPress={handleEditSelectedBook}
          >
            <Icon name='edit' size={16} color='#fff' />
            <Text className='text-lg color-white'>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='flex-row items-center justify-center w-full gap-4 py-3 bg-red-500 rounded-md'
            onPress={handleDeleteBook}
          >
            <Icon name='delete' size={16} color='#fff' />
            <Text className='text-lg color-white'>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}
