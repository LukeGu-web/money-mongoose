import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import ListItem from './ListItem';
import Icon from '../Icon/Icon';
import ExpandGroupTitle from '../ExpandView/ExpandGroupTitle';
import { useBookStore } from 'core/stateHooks';

export default function AccountList() {
  let numOfAssets = 0;
  const { getCurrentBook } = useBookStore();
  return (
    <View className='flex-1 gap-2'>
      {getCurrentBook()?.groups.map((group) => {
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
                    <ListItem item={item} onPress={() => {}} />
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
        onPress={() => router.navigate('/asset/details')}
      >
        <Text className='color-blue-500'>Add account</Text>
        <Icon name='credit-card-plus' size={20} color='#3b82f6' />
      </TouchableOpacity>
    </View>
  );
}
