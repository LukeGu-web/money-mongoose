import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  LayoutAnimation,
} from 'react-native';
import Icon from '../Icon/Icon';
import FilterContent from '../Filter/RecordsFilter';

export default function RecordsFilter() {
  const [expanded, setExpanded] = useState(false);
  const [containerHeight, setContainerHeight] = useState(40);
  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: expanded ? ['0deg', '180deg'] : ['180deg', '0deg'],
  });

  const isScreenMountedRef = useRef(false);

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const toggleExpand = () => {
    if (!isScreenMountedRef.current) isScreenMountedRef.current = true;
    setExpanded(!expanded);
    LayoutAnimation.easeInEaseOut();
    setContainerHeight(!expanded ? 330 : 40);
  };

  return (
    <View
      className={`justify-center px-4 -m-2 bg-gray-300 ${expanded && 'pt-2'}`}
      style={{ minHeight: containerHeight }}
    >
      <Pressable
        className='flex-row items-center justify-end w-full rounded-lg'
        onPress={toggleExpand}
      >
        <View className='flex-row items-center gap-2 pl-4 pr-2 rounded-full bg-zinc-500'>
          <Text className='color-white'>Filter</Text>
          <Animated.View
            style={
              isScreenMountedRef.current ? { transform: [{ rotate }] } : null
            }
          >
            <Icon name='menu-down' size={24} color='white' />
          </Animated.View>
        </View>
      </Pressable>
      {expanded && <FilterContent />}
    </View>
  );
}
