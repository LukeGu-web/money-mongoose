import { View, FlatList, Pressable, Text } from 'react-native';
import { useFormContext } from 'react-hook-form';
import Icon from '../Icon/Icon';

export default function IconTable({ data, onSelect }: IconTableProps) {
  const { getValues } = useFormContext();
  const isArray = Array.isArray(data);
  const numColumns = isArray ? 4 : 5;

  return (
    <FlatList
      data={isArray ? data : Object.keys(data)}
      scrollEnabled={false}
      numColumns={numColumns} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      style={{ flexGrow: 0 }}
      renderItem={({ item }) => {
        const hasSubcategory = !isArray && data[item].length > 0;
        return (
          <Pressable onPress={() => onSelect(item, hasSubcategory)}>
            <View
              className={`items-center justify-center m-4 rounded-full w-14 h-14 ${
                item === getValues('category')
                  ? 'bg-amber-200'
                  : 'bg-transparent'
              }`}
            >
              <Icon name={item} color='#1e1b4b' size={30} />
            </View>
            {hasSubcategory && (
              <View className='absolute right-0 items-center justify-center w-5 h-5 m-4 rounded-full bg-zinc-200 bottom-4'>
                <Icon name='dots-three-vertical' size={10} color='#000' />
              </View>
            )}
            <View className='items-center -mt-1'>
              <Text style={{ fontSize: 10 }}>{item}</Text>
              <Text style={{ fontSize: 8, opacity: 0.9 }}>
                {item === getValues('category') ? getValues('subcategory') : ''}
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

type IconTableProps = {
  data:
    | string[]
    | {
        [key: string]: string[];
      };
  onSelect: (item: string, hasSubcategory: boolean) => void;
};
