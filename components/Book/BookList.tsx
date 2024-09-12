import { useRef } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useGetAllBooks } from 'api/book';
import ListItem from './ListItem';
import BookBottomSheet from 'components/BottomSheet/BookBottomSheet';

export default function BookList() {
  const { data } = useGetAllBooks();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePressItem = () => {
    bottomSheetModalRef.current?.present();
  };
  return (
    <View className='flex-1 w-full'>
      {data && (
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <ListItem item={item} onPress={handlePressItem} />
          )}
          estimatedItemSize={10}
        />
      )}
      <BookBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}
