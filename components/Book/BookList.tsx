import { useRef, useCallback } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import ListItem from './ListItem';
import BookBottomSheet from 'components/BottomSheet/BookBottomSheet';
import { useBookStore } from 'core/stateHooks';

export default function BookList() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const books = useBookStore((state) => state.books);

  const handlePressItem = () => {
    bottomSheetModalRef.current?.present();
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
      <BookBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}
