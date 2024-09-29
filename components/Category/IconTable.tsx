import { View, FlatList, Pressable, Text } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { useSettingStore } from 'core/stateHooks';
import Entypo from '@expo/vector-icons/Entypo';
import Icon from '../Icon/CIcon';

export default function IconTable({ data, onSelect }: IconTableProps) {
  const theme = useSettingStore((state) => state.theme);
  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const isArray = Array.isArray(data);
  const numColumns = isArray ? 4 : 5;

  return (
    <FlatList
      data={isArray ? data : Object.keys(data)}
      scrollEnabled={false}
      numColumns={numColumns} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      className={`flex-grow-0 border-2 mt-0.5 rounded-md ${
        errors.category ? 'border-red-500' : 'border-white dark:border-black'
      } `}
      renderItem={({ item }) => {
        const hasSubcategory = !isArray && data[item].length > 0;
        return (
          <Pressable onPress={() => onSelect(item, hasSubcategory)}>
            <View
              className={`items-center justify-center m-4 rounded-full w-14 h-14 ${
                item === getValues('category')
                  ? 'bg-amber-200 dark:bg-yellow-800'
                  : 'bg-transparent'
              }`}
            >
              <Icon
                // @ts-ignore: ignore json type
                name={`c-${item}`}
                color={theme === 'dark' ? '#e0f2fe' : '#1e1b4b'}
                size={30}
              />
            </View>
            {hasSubcategory && (
              <View className='absolute right-0 items-center justify-center w-5 h-5 m-4 rounded-full bg-zinc-200 bottom-4'>
                <Entypo name='dots-three-vertical' size={10} color='black' />
              </View>
            )}
            <View className='items-center -mt-1'>
              <Text className='text-xs dark:color-white'>{item}</Text>
              <Text
                className='dark:color-white'
                style={{ fontSize: 8, opacity: 0.9 }}
              >
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
