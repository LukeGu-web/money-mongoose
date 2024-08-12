import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useShallow } from 'zustand/react/shallow';

import ListItem from './ListItem';
import { useBookStore } from 'core/stateHooks';

export default function BookList() {
  const { books, currentBook } = useBookStore(
    useShallow((state) => ({
      books: state.books,
      currentBook: state.currentBook,
    }))
  );
  const handlePressItem = () => {
    // bottomSheetModalRef.current?.present();
  };
  return (
    <View className='flex-1 w-full'>
      <FlashList
        data={books}
        renderItem={({ item }) => (
          <ListItem item={item} onPress={handlePressItem} />
        )}
        estimatedItemSize={10}
      />
    </View>
  );
}
