import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  FlatList,
} from 'react-native';
import { useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import DropdownItem from './DropdownItem';
import { DropdownDataType, DropdownProps } from './types';

export default function Dropdown({
  testID,
  testIDDropdown,
  data,
  placeholder,
  selected,
  setSelected,
}: DropdownProps) {
  const [value, setValue] = useState<string>('');
  const [filteredData, setFilteredData] =
    useState<DropdownDataType<string, string>[]>(data);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const resetData = () => {
    setFilteredData(data);
    setValue('');
    setSelected(null);
  };

  const onSelect = (item: DropdownDataType<string, string>) => {
    setSelected(item);
    setValue(item.value);
    onDropdownToggle(false);
  };

  const onDropdownToggle = (open: boolean) => {
    if (open) {
      setIsDropdownOpen(open);
      Animated.timing(dropdownHeight, {
        toValue: 200,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(dropdownHeight, {
        toValue: 10,
        duration: 600,
        useNativeDriver: false,
      }).start(() => setIsDropdownOpen(open));
    }
  };

  const onSearching = (text: string) => {
    setValue(text);
    const filtered = data.filter((item) =>
      item.value.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <>
      {isDropdownOpen ? (
        <View
          testID={testID}
          className='flex-row gap-2 p-2 border-2 border-blue-400 rounded-lg min-h-8'
        >
          <MaterialIcons name='search' size={24} color='#9ca3af' />
          <TextInput
            className='flex-grow '
            placeholder={placeholder}
            clearButtonMode='while-editing'
            value={value}
            onChangeText={onSearching}
          />
          <MaterialIcons
            name='close'
            size={24}
            color='#9ca3af'
            onPress={resetData}
          />
          <MaterialIcons
            name='keyboard-arrow-up'
            size={24}
            color='#9ca3af'
            onPress={() => onDropdownToggle(false)}
          />
        </View>
      ) : (
        <TouchableOpacity
          testID={testID}
          className='flex-row items-center p-2 border-2 border-gray-400 rounded-lg min-h-8'
          onPress={() => onDropdownToggle(true)}
        >
          <Text
            className={`flex-grow font-medium ${!selected && 'color-gray-300'}`}
          >
            {selected ? selected.value : placeholder}
          </Text>
          <MaterialIcons name='keyboard-arrow-down' size={24} color='#9ca3af' />
        </TouchableOpacity>
      )}
      {isDropdownOpen ? (
        <Animated.View
          testID={testIDDropdown}
          className='border-2 border-blue-400 rounded-lg '
          style={{ maxHeight: dropdownHeight }}
        >
          <FlatList
            className='min-w-full p-2'
            nestedScrollEnabled={true}
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              if (filteredData.length === 0) {
                return (
                  <View className='items-center justify-center flex-1'>
                    <Text className='color-gray-300'>No results found</Text>
                  </View>
                );
              }

              return <DropdownItem key={index} item={item} select={onSelect} />;
            }}
          ></FlatList>
        </Animated.View>
      ) : null}
    </>
  );
}
