import { useState, useCallback } from 'react';
import { View, FlatList, Pressable, Text } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { useFocusEffect } from 'expo-router';
import { useSettingStore } from 'core/stateHooks';
import Entypo from '@expo/vector-icons/Entypo';
import Icon from '../Icon/CIcon';

export default function IconTable({
  data,
  onSelect,
  onSetCustom,
}: IconTableProps) {
  const theme = useSettingStore((state) => state.theme);
  const {
    getValues,
    resetField,
    formState: { errors },
  } = useFormContext();
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const isArray = Array.isArray(data);
  const numColumns = isArray ? 4 : 5;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsCustom(false);
      };
    }, [])
  );

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
        if (item === 'custom' && onSetCustom) {
          const isSelected = isCustom && getValues('category');
          const handlePressCustom = () => {
            resetField('category');
            onSetCustom();
            setIsCustom(true);
          };
          return (
            <Pressable onPress={handlePressCustom}>
              <View
                className={`items-center justify-center m-4 rounded-full w-14 h-14 ${
                  isSelected
                    ? 'bg-amber-200 dark:bg-amber-400'
                    : 'bg-transparent'
                }`}
              >
                {isSelected ? (
                  <Entypo
                    name='new'
                    size={30}
                    color={theme === 'dark' ? '#e0f2fe' : '#1e1b4b'}
                  />
                ) : (
                  <View className='border-2 border-dotted rounded-lg border-primary dark:border-sky-100'>
                    <Entypo
                      name='plus'
                      size={30}
                      color={theme === 'dark' ? '#e0f2fe' : '#1e1b4b'}
                    />
                  </View>
                )}
              </View>
              <View className='items-center -mt-1'>
                <Text className='text-xs dark:color-white'>
                  {isSelected ? getValues('category') : item}
                </Text>
                <Text
                  className='dark:color-white'
                  style={{ fontSize: 8, opacity: 0.9 }}
                >
                  {isCustom && getValues('subcategory')
                    ? getValues('subcategory')
                    : ''}
                </Text>
              </View>
            </Pressable>
          );
        }
        const hasSubcategory = !isArray && data[item].length > 0;
        const handlePressCategory = () => {
          onSelect(item, hasSubcategory);
          if (isCustom) setIsCustom(false);
        };
        return (
          <Pressable onPress={handlePressCategory}>
            <View
              className={`items-center justify-center m-4 rounded-full w-14 h-14 ${
                item === getValues('category')
                  ? 'bg-amber-200 dark:bg-amber-400'
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
  onSetCustom?: () => void;
};
