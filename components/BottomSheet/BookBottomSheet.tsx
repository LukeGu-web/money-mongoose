import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useShallow } from 'zustand/react/shallow';

import { BookType } from 'api/book/types';
import { useBookStore } from 'core/stateHooks';
import { useStyles, TColors } from 'core/theme';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type BookBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function BookBottomSheet({
  bottomSheetModalRef,
}: BookBottomSheetProps) {
  const { styles, theme } = useStyles(createStyles);
  const { selectedBook, setCurrentBook } = useBookStore(
    useShallow((state) => ({
      selectedBook: state.selectedBook,
      setCurrentBook: state.setCurrentBook,
    }))
  );

  const handleSelectCurrentBook = () => {
    bottomSheetModalRef.current?.dismiss();
    setCurrentBook(selectedBook as BookType);
  };

  const handleEditSelectedBook = async () => {
    bottomSheetModalRef.current?.dismiss();
    router.navigate('/book/details');
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={250}>
      <View className='items-center justify-between w-full gap-4 px-4'>
        <View className='flex-row w-full p-4'>
          <Text className='text-2xl font-bold'>{selectedBook?.name}</Text>
        </View>
        <View className='items-center justify-between w-full gap-4 px-4'>
          <TouchableOpacity
            className='flex-row items-center justify-center w-full gap-4 py-4 bg-blue-500 rounded-md'
            onPress={handleSelectCurrentBook}
          >
            <Feather name='check-circle' size={16} color='#fff' />
            <Text className='text-lg color-white'>Select</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='flex-row items-center justify-center w-full gap-4 py-4 bg-blue-500 rounded-md'
            onPress={handleEditSelectedBook}
          >
            <Icon name='edit' size={16} color='#fff' />
            <Text className='text-lg color-white'>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    // button: {
    //   width: '100%',
    //   flexDirection: 'row',
    //   backgroundColor: theme.primary,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   paddingVertical: 16,
    //   borderRadius: 8,
    //   gap: 12,
    // },
  });
