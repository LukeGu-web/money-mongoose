import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation,
} from 'react-native';
import Icon from '../Icon/Icon';
import { GroupTitleProps } from './types';

export default function ExpandGroupTitle({
  title,
  children,
  height,
}: GroupTitleProps) {
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
    if (height) {
      LayoutAnimation.easeInEaseOut();
      setContainerHeight(!expanded ? 60 + height : 40);
    }
  };

  return (
    <View
      className='p-2 bg-gray-200 rounded-lg'
      style={{ minHeight: containerHeight }}
    >
      <TouchableOpacity
        className='flex-row items-center justify-between w-full rounded-lg'
        onPress={toggleExpand}
      >
        <View className='flex-row items-center flex-1 gap-2 px-2'>
          <Text className='text-xl font-bold'>{title.text}</Text>
          <Text className=' color-gray-500'>({title.number})</Text>
        </View>
        <View className='flex-row items-center gap-2 px-2'>
          <Text className='color-gray-500'>{title.amount}</Text>
          <Animated.View
            style={
              isScreenMountedRef.current ? { transform: [{ rotate }] } : null
            }
          >
            <Icon name='menu-down' size={24} color='black' />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {expanded && <View className='flex-1 py-4'>{children}</View>}
    </View>
  );
}
