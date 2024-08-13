import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { useShallow } from 'zustand/react/shallow';
import ListItem from './ListItem';

import { useAsset, useBookStore } from 'core/stateHooks';
import Icon from '../Icon/Icon';
import ExpandGroupTitle from '../ExpandView/ExpandGroupTitle';

export default function AccountList() {
  let numOfAssets = 0;
  const { currentBook, books } = useBookStore(
    useShallow((state) => ({
      currentBook: state.currentBook,
      books: state.books,
    }))
  );

  const resetAccount = useAsset((state) => state.resetAccount);
  const handlePressItem = () => {};
  return (
    <View className='flex-1 gap-2'>
      {currentBook?.groups.map((group) => {
        if (group.assets.length > 0) {
          const assets = group.assets;
          const title = {
            text: group.name,
            number: assets.length,
            amount: assets.reduce((sum, item) => sum + Number(item.balance), 0),
          };
          numOfAssets += assets.length;
          return (
            <ExpandGroupTitle
              key={group.id}
              title={title}
              height={40 * assets.length}
            >
              <View className='flex-1 w-full'>
                <FlashList
                  data={assets}
                  renderItem={({ item }) => (
                    <ListItem item={item} onPress={handlePressItem} />
                  )}
                  estimatedItemSize={10}
                />
              </View>
            </ExpandGroupTitle>
          );
        }
      })}
      {numOfAssets === 0 && (
        <View className='items-center py-4 bg-gray-100 rounded-md'>
          <Text>No account yet</Text>
        </View>
      )}
      <TouchableOpacity
        className='flex-row items-center justify-center w-full gap-2 p-2'
        onPress={() => {
          resetAccount();
          router.navigate('/asset/add-bank-account');
        }}
      >
        <Text className='color-blue-500'>Add account</Text>
        <Icon name='credit-card-plus' size={20} color='#3b82f6' />
      </TouchableOpacity>
    </View>
  );
}
