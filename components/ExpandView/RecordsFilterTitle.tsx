import { useState } from 'react';
import { View, Text, Pressable, LayoutAnimation } from 'react-native';
import { router } from 'expo-router';
import dayjs from 'dayjs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from '../Icon/Icon';
import FilterContent from '../Filter/RecordsFilter';

export type FilterType = {
  date_after?: Date;
  date_before?: Date;
  type: string;
  asset?: number;
  is_marked_tax_return: boolean;
};

export const defaultFilter: FilterType = {
  type: '',
  is_marked_tax_return: false,
};

type RecordsFilterProps = {
  onSetFilter: (value: string) => void;
};

export default function RecordsFilter({ onSetFilter }: RecordsFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [filter, setFilter] = useState<FilterType>(defaultFilter);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState(40);

  const toggleExpand = () => {
    setIsFilterOpen(!isFilterOpen);
    LayoutAnimation.easeInEaseOut();
    setContainerHeight(!isFilterOpen ? 400 : 40);
  };

  const handleCloseFilter = (isFilter: boolean, filterData: FilterType) => {
    setHasFilter(isFilter);
    setFilter(filterData);
    // following code is for automatically close filter
    setIsFilterOpen(false);
    LayoutAnimation.easeInEaseOut();
    setContainerHeight(40);
  };

  const handleBackHome = () => {
    router.replace('/');
  };

  return (
    <View className={`bg-primary px-4`} style={{ minHeight: containerHeight }}>
      <View className='flex-row items-center justify-between'>
        <Pressable
          className='py-2 pr-4 '
          disabled={isFilterOpen}
          onPress={handleBackHome}
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
          <FontAwesome name='search' size={22} color={'#fff'} />
        </Pressable>
        <Pressable
          className='flex-row items-center px-2'
          onPress={toggleExpand}
        >
          {isFilterOpen ? (
            <MaterialCommunityIcons
              name='filter-minus'
              size={24}
              color='white'
            />
          ) : hasFilter ? (
            <MaterialCommunityIcons
              name='filter-check'
              size={24}
              color='#eab308'
            />
          ) : (
            <MaterialCommunityIcons
              name='filter-plus'
              size={24}
              color='white'
            />
          )}
        </Pressable>
      </View>

      {isFilterOpen && (
        <FilterContent
          filter={filter}
          onSetFilter={onSetFilter}
          onCloseFilter={handleCloseFilter}
        />
      )}
    </View>
  );
}
