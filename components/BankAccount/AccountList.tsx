import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import ListItem from './ListItem';
import Icon from '../Icon/Icon';
import ExpandGroupTitle from '../ExpandView/ExpandGroupTitle';
import { AssetGroupType } from 'api/types';
import { useAsset } from 'core/stateHooks';

type AccountListProps = {
  groups: AssetGroupType[];
};

export default function AccountList({ groups }: AccountListProps) {
  let numOfAssets = 0;
  const resetAsset = useAsset((state) => state.resetAsset);
  return (
    <View className='flex-1 gap-2'>
      {groups.map((group) => {
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
              height={30 * assets.length}
            >
              <View className='flex-1 w-full'>
                <FlashList
                  data={assets}
                  renderItem={({ item }) => (
                    <ListItem
                      item={item}
                      onPress={() => router.navigate('/asset/records')}
                    />
                  )}
                  estimatedItemSize={10}
                />
              </View>
            </ExpandGroupTitle>
          );
        }
      })}
      {numOfAssets === 0 && (
        <View className='items-center py-4 bg-gray-100 rounded-lg'>
          <Text>No account yet</Text>
        </View>
      )}
      <Pressable
        className='flex-row items-center justify-center w-full gap-2 p-2'
        onPress={() => {
          resetAsset();
          router.navigate('/asset/details');
        }}
      >
        <Text className='color-blue-500'>Add account</Text>
        <Icon name='credit-card-plus' size={20} color='#3b82f6' />
      </Pressable>
    </View>
  );
}
