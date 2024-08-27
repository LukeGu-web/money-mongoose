import { useState } from 'react';
import { View, Text, Pressable, LayoutAnimation } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from '../Icon/Icon';
import FilterContent from '../Filter/RecordsFilter';

type RecordsFilterProps = {
  onSetFilter: (value: string) => void;
};

export default function RecordsFilter({ onSetFilter }: RecordsFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState(40);

  const toggleExpand = () => {
    setIsFilterOpen(!isFilterOpen);
    LayoutAnimation.easeInEaseOut();
    setContainerHeight(!isFilterOpen ? 400 : 40);
  };

  return (
    <View className={`bg-primary px-4`} style={{ minHeight: containerHeight }}>
      <View className='flex-row items-center justify-between'>
        <Pressable
          className='py-2 pr-4 '
          disabled={isFilterOpen}
          onPress={() => router.back()}
        >
          <Icon
            name='left'
            size={24}
            color={isFilterOpen ? '#03045e' : '#fff'}
          />
        </Pressable>
        <Text
          className={`flex-1 text-lg font-semibold text-left ${
            isFilterOpen ? 'color-primary' : 'color-white'
          }`}
        >
          Record List
        </Text>
        <Pressable className='px-2 mr-4'>
          <FontAwesome
            name='search'
            size={22}
            color={isFilterOpen ? '#03045e' : '#fff'}
          />
        </Pressable>
        <Pressable
          className='flex-row items-center px-2'
          onPress={toggleExpand}
        >
          <FontAwesome
            name='filter'
            size={22}
            color={isFilterOpen ? '#eab308' : '#fff'}
          />
        </Pressable>
      </View>

      {isFilterOpen && <FilterContent onSetFilter={onSetFilter} />}
    </View>
  );
}
