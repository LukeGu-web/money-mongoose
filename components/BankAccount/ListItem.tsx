import { View, Text, Pressable } from 'react-native';
import Icon from 'components/Icon/Icon';
import { AssetType } from 'api/types';
import { useAsset } from 'core/stateHooks';

type ListItemProps = {
  item: AssetType;
  onPress: () => void;
};

export default function ListItem({ item, onPress }: ListItemProps) {
  const setSelect = useAsset((state) => state.setSelect);
  return (
    <Pressable
      className='flex-row items-center justify-between p-2 border-b-2 border-gray-300'
      onPress={() => {
        setSelect(item);
        onPress();
      }}
    >
      {/* <View style={styles.iconContainer}>
        <Icon name={item.name} size={28} color='black' />
      </View> */}
      <View>
        <View className='flex-row items-end gap-2 pb-2'>
          <Text className='font-bold'>{item.name}</Text>
          {item.is_credit && (
            <Text className='mb-1 text-sm color-red-500'>[credit]</Text>
          )}
        </View>
        {item.note !== '' && (
          <Text className='color-gray-400'>{item.note}</Text>
        )}
      </View>
      <Text className='font-bold'>{Number(item.balance).toFixed(2)}</Text>
    </Pressable>
  );
}
