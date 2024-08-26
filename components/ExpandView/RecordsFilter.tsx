import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  LayoutAnimation,
} from 'react-native';
import { SplashScreen, Stack, router } from 'expo-router';
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
    setContainerHeight(!expanded ? 400 : 40);
  };

  return (
    <View className={`bg-primary px-4`} style={{ minHeight: containerHeight }}>
      <View className='flex-row items-center justify-between'>
        <Pressable
          className='py-2 pr-8 '
          disabled={expanded}
          onPress={() => router.back()}
        >
          <Icon name='left' size={24} color={expanded ? '#03045e' : '#fff'} />
        </Pressable>
        <Text
          className={`flex-1 text-lg font-semibold text-left ${
            expanded ? 'color-primary' : 'color-white'
          }`}
        >
          Record List
        </Text>
        <Pressable
          className='flex-row items-center rounded-lg'
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
      </View>

      {expanded && <FilterContent />}
    </View>
  );
}
