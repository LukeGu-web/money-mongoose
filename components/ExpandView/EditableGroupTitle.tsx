import { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  LayoutAnimation,
} from 'react-native';
import { router } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';

import Icon from '../Icon/Icon';
import { useStyles, TColors } from 'core/theme';
import { useAsset } from 'core/stateHooks';
import EditAssetGroupBottomSheet from '../BottomSheet/EditAssetGroupBottomSheet';

type TitleType = {
  text: string;
  number: number;
  amount: number;
};

type EditableGroupTitleProps = {
  title: TitleType;
  children: ReactNode;
  height?: number;
};

export default function EditableGroupTitle({
  title,
  children,
  height,
}: EditableGroupTitleProps) {
  const { styles, theme } = useStyles(createStyles);
  const resetAccount = useAsset((state) => state.resetAccount);

  const [expanded, setExpanded] = useState(false);
  const [containerHeight, setContainerHeight] = useState(40);

  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: expanded ? ['0deg', '180deg'] : ['180deg', '0deg'],
  });

  const isScreenMountedRef = useRef(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const functions = {
    'Add Account': () => {
      resetAccount();
      router.navigate('/asset/add-bank-account');
    },
    Edit: () => router.navigate('/asset/add-bank-account'),
    Delete: () => router.navigate('/asset/add-bank-account'),
  };

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
  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <View style={{ ...styles.itemContainer, height: containerHeight }}>
      <View style={styles.itemTouchable}>
        <TouchableOpacity
          style={styles.titleWrapper}
          onPress={handlePressSelect}
        >
          <Icon name='edit' size={16} color={theme.black} />
          <Text style={styles.itemTitle}>{title.text}</Text>
          <Text style={styles.titleInfo}>({title.number})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.titleWrapper, styles.amountWrapper]}
          onPress={toggleExpand}
        >
          <Text style={styles.titleInfo}>{title.amount}</Text>
          <Animated.View
            style={
              isScreenMountedRef.current ? { transform: [{ rotate }] } : null
            }
          >
            <AntDesign name='caretdown' size={14} color={theme.black} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {expanded && <View style={styles.itemContent}>{children}</View>}
      <EditAssetGroupBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        funtions={functions}
        title={title.text}
        onCancel={handleCloseSheet}
      />
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
      paddingHorizontal: 4,
      gap: 4,
    },
    amountWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    titleInfo: {
      color: 'gray',
    },
  });
