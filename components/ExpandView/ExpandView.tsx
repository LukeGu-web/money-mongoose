import React, { ReactNode, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  LayoutAnimation,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useStyles, TColors } from 'core/theme';

type TitleType = {
  text: string;
  number: number;
  amount: number;
};

type ExpandViewProps = {
  title: string;
  children: ReactNode;
  height?: number;
};

export default function ExpandView({
  title,
  children,
  height,
}: ExpandViewProps) {
  const { styles } = useStyles(createStyles);

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
      setContainerHeight(!expanded ? 40 + height : 40);
    }
  };

  return (
    <View style={{ ...styles.itemContainer, height: containerHeight }}>
      <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
        <View style={styles.titleWrapper}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.titleInfo}>(2)</Text>
        </View>
        <View style={{ ...styles.titleWrapper, alignItems: 'center' }}>
          <Text style={styles.titleInfo}>{1000}</Text>
          <Animated.View
            style={
              isScreenMountedRef.current ? { transform: [{ rotate }] } : null
            }
          >
            <AntDesign name='caretdown' size={14} color='black' />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {expanded && <View style={styles.itemContent}>{children}</View>}
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    itemContainer: {
      padding: 8,
      backgroundColor: theme.bgPrimary,
      borderRadius: 10,
      elevation: 3,
    },
    itemTouchable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 10,
      overflow: 'hidden',
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    itemContent: {
      flex: 1,
      paddingVertical: 8,
    },
    titleWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 4,
    },
    titleInfo: {
      color: 'gray',
    },
  });
