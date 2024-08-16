import { View, Text, TouchableOpacity } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { BookType } from 'api/types';
import { useBookStore } from 'core/stateHooks';

type ListItemProps = {
  item: BookType;
  onPress: () => void;
};

export default function ListItem({ item, onPress }: ListItemProps) {
  const { currentBookId, selectBook } = useBookStore(
    useShallow((state) => ({
      currentBookId: state.currentBookId,
      selectBook: state.selectBook,
    }))
  );
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between p-2 mb-4 border-2 rounded-md ${
        item.id === currentBookId && 'bg-green-200'
      }`}
      onPress={() => {
        selectBook(item);
        onPress();
      }}
    >
      <View>
        <View className='flex-row items-end gap-2 pb-2'>
          <Text className='font-bold'>{item.name}</Text>
        </View>
        {item.note !== '' && (
          <Text className='color-gray-400'>{item.note}</Text>
        )}
      </View>
      {/* <Text style={styles.amount}>{Number(item.balance).toFixed(2)}</Text> */}
    </TouchableOpacity>
  );
}
