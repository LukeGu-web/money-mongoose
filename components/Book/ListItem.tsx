import { View, Text, Pressable } from 'react-native';
import { BookType } from 'api/types';
import { useBookStore, useBook } from 'core/stateHooks';

type ListItemProps = {
  item: BookType;
  onPress: () => void;
};

export default function ListItem({ item, onPress }: ListItemProps) {
  const currentBook = useBookStore((state) => state.currentBook);
  const setSelect = useBook((state) => state.setSelect);
  return (
    <Pressable
      className={`flex-row items-center justify-between p-2 mb-4 border-2 rounded-lg min-h-20 ${
        item.id === currentBook.id
          ? 'bg-green-200 dark:bg-green-800'
          : 'bg-white dark:bg-zinc-600'
      }`}
      onPress={() => {
        setSelect(item);
        onPress();
      }}
    >
      <View>
        <View className='flex-row items-end gap-2 pb-2'>
          <Text className='font-bold dark:color-white'>{item.name}</Text>
        </View>
        <Text className='color-gray-400 dark:color-white'>
          {item.note ?? ''}
        </Text>
      </View>
      {/* <Text style={styles.amount}>{Number(item.balance).toFixed(2)}</Text> */}
    </Pressable>
  );
}
