import { useState, useRef } from 'react';
import { View, Text, Pressable, Animated, LayoutAnimation } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Entypo from '@expo/vector-icons/Entypo';

type SubcategoryType = {
  subcategory: string;
  total_amount: string;
  percentage: number;
  record_count: number;
};

export type DetailsType = {
  total_amount: string;
  record_count: number;
  percentage: number;
  subcategories: SubcategoryType[];
};

function Item({ item, text }: { item: SubcategoryType; text: string }) {
  return (
    <View className='flex-row justify-between'>
      <Text className='text-sm color-gray-800'>
        - {item.subcategory || text}
      </Text>
      <Text className='text-sm color-gray-800'>{item.percentage}</Text>
      <Text className='text-sm color-gray-800'>{item.total_amount}</Text>
    </View>
  );
}

export default function Legend({
  text,
  color,
  value,
  details,
}: {
  text: string;
  color: string;
  value: number;
  details: DetailsType;
}) {
  const [expanded, setExpanded] = useState(false);
  const [containerHeight, setContainerHeight] = useState(20);
  const isScreenMountedRef = useRef(false);

  const toggleExpand = () => {
    if (!isScreenMountedRef.current) isScreenMountedRef.current = true;
    setExpanded(!expanded);
    LayoutAnimation.easeInEaseOut();
    setContainerHeight(!expanded ? 20 * details.subcategories.length : 20);
  };

  return (
    <View>
      <Pressable
        className='flex-row items-center justify-between w-full px-2'
        onPress={toggleExpand}
      >
        <View className='flex-row items-center'>
          <View
            className='w-4 h-4 mr-2 rounded-md opacity-70'
            style={{
              backgroundColor: color || 'white',
            }}
          />
          <Text>{text}</Text>
          <Text className='ml-2 text-sm color-gray-500'>
            ( {value}%, {details.record_count} records )
          </Text>
        </View>
        <View className='flex-row items-center'>
          <Text className='ml-4'>${details.total_amount}</Text>
          <Entypo name='chevron-small-right' size={24} color='black' />
        </View>
      </Pressable>
      {expanded && (
        <View style={{ minHeight: containerHeight }} className='px-8 pr-4'>
          <FlashList
            data={details.subcategories}
            renderItem={({ item }) => <Item item={item} text={text} />}
            estimatedItemSize={10}
          />
        </View>
      )}
    </View>
  );
}
