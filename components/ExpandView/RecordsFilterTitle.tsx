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

enum FilterTypes {
  CLOSE = 'close',
  SEARCH = 'search',
  FILTER = 'filter',
}

export default function RecordsFilterTitle({
  search,
  onSetSearch,
  onSetFilter,
}: RecordsFilterProps) {
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [type, setType] = useState<FilterTypes>(FilterTypes.CLOSE);
  const [hasFilter, setHasFilter] = useState(false);
  const [filter, setFilter] = useState<FilterType>(defaultFilter);
  const [filterContentHeight, setFilterContentHeight] = useState(0);
  const [searchContentHeight, setSearchContentHeight] = useState(0);

  const toggleSearchExpand = () => {
    setType(
      type === FilterTypes.SEARCH ? FilterTypes.CLOSE : FilterTypes.SEARCH
    );
    LayoutAnimation.easeInEaseOut();
    setSearchContentHeight(type !== FilterTypes.SEARCH ? 60 : 0);
  };

  const toggleFilterExpand = () => {
    setType(
      type === FilterTypes.FILTER ? FilterTypes.CLOSE : FilterTypes.FILTER
    );
    LayoutAnimation.easeInEaseOut();
    setFilterContentHeight(type !== FilterTypes.FILTER ? 360 : 0);
  };

  const handleCloseFilter = (isFilter: boolean, filterData: FilterType) => {
    setHasFilter(isFilter);
    setFilter(filterData);
    // following code is for automatically close filter
    setType(FilterTypes.CLOSE);
    LayoutAnimation.easeInEaseOut();
    setFilterContentHeight(0);
  };

  const handleSearch = (search: string) => {
    // following code is for automatically close search
    setType(FilterTypes.CLOSE);
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
            disabled={type !== FilterTypes.CLOSE}
            onPress={handleBackHome}
          >
            <Icon
              name='left'
              size={24}
              color={type !== FilterTypes.CLOSE ? '#03045e' : '#fff'}
            />
          </Pressable>
          {search !== '' ? (
            <Pressable
              className='flex-row items-center justify-center gap-2 px-2 border-2 border-white rounded-full h-7'
              onPress={() => onSetSearch('')}
            >
              <Text className='font-semibold color-white '>{search}</Text>
              <Icon name='close' size={14} color='#fff' />
            </Pressable>
          ) : (
            <Text
              className={`flex-1 text-lg font-semibold text-left ${
                type !== FilterTypes.CLOSE ? 'color-primary' : 'color-white'
              }`}
            >
              Record List
            </Text>
          )}
        </View>
        <Pressable className='px-2 mr-4' onPress={toggleSearchExpand}>
          <FontAwesome
            name='search'
            size={22}
            color={type === FilterTypes.FILTER ? '#03045e' : '#fff'}
          />
        </Pressable>
        <Pressable
          className='flex-row items-center px-2'
          onPress={toggleFilterExpand}
        >
          {type === FilterTypes.FILTER ? (
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
              color={type === FilterTypes.SEARCH ? '#03045e' : '#fff'}
            />
          )}
        </Pressable>
      </View>
      {type === FilterTypes.SEARCH && (
        <View style={{ minHeight: searchContentHeight }}>
          <RecordsSearch onSearch={handleSearch} />
        </View>
      )}
      {type === FilterTypes.FILTER && (
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
