import { useState } from 'react';
import { View, Text, Pressable, LayoutAnimation } from 'react-native';
import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from '../Icon/Icon';
import RecordsFilter, {
  FilterType,
  defaultFilter,
} from '../Filter/RecordsFilter';
import RecordsSearch from 'components/Filter/RecordsSearch';

type RecordsFilterProps = {
  search: string;
  onSetFilter: (value: string) => void;
  onSetSearch: (value: string) => void;
};

export default function RecordsFilterTitle({
  search,
  onSetSearch,
  onSetFilter,
}: RecordsFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [filter, setFilter] = useState<FilterType>(defaultFilter);
  const [filterContentHeight, setFilterContentHeight] = useState(0);
  const [searchContentHeight, setSearchContentHeight] = useState(0);

  const toggleSearchExpand = () => {
    setIsSearchOpen(!isSearchOpen);
    LayoutAnimation.easeInEaseOut();
    setSearchContentHeight(!isSearchOpen ? 60 : 0);
  };

  const toggleFilterExpand = () => {
    setIsFilterOpen(!isFilterOpen);
    LayoutAnimation.easeInEaseOut();
    setFilterContentHeight(!isFilterOpen ? 360 : 0);
  };

  const handleCloseFilter = (isFilter: boolean, filterData: FilterType) => {
    setHasFilter(isFilter);
    setFilter(filterData);
    // following code is for automatically close filter
    setIsFilterOpen(false);
    LayoutAnimation.easeInEaseOut();
    setFilterContentHeight(0);
  };

  const handleSearch = (search: string) => {
    // following code is for automatically close search
    setIsSearchOpen(false);
    LayoutAnimation.easeInEaseOut();
    setSearchContentHeight(0);
    setTimeout(() => {
      onSetSearch(search);
    }, 300);
  };

  const handleBackHome = () => {
    router.replace('/');
  };

  return (
    <View className={`bg-primary px-4 pb-1`}>
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center flex-1 gap-4'>
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
          {search !== '' ? (
            <Pressable
              className='flex-row items-center justify-center h-8 gap-3 px-2 border-2 border-white rounded-full'
              onPress={() => onSetSearch('')}
            >
              <Text className='text-lg font-semibold color-white '>
                {search}
              </Text>
              <Icon name='close' size={16} color='#fff' />
            </Pressable>
          ) : (
            <Text
              className={`flex-1 text-lg font-semibold text-left ${
                isFilterOpen ? 'color-primary' : 'color-white'
              }`}
            >
              Record List
            </Text>
          )}
        </View>
        <Pressable className='px-2 mr-4' onPress={toggleSearchExpand}>
          <FontAwesome name='search' size={22} color={'#fff'} />
        </Pressable>
        <Pressable
          className='flex-row items-center px-2'
          onPress={toggleFilterExpand}
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
      {isSearchOpen && (
        <View style={{ minHeight: searchContentHeight }}>
          <RecordsSearch onSearch={handleSearch} />
        </View>
      )}
      {isFilterOpen && (
        <View style={{ minHeight: filterContentHeight }}>
          <RecordsFilter
            filter={filter}
            onSetFilter={onSetFilter}
            onCloseFilter={handleCloseFilter}
          />
        </View>
      )}
    </View>
  );
}
