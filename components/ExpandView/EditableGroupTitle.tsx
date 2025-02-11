import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Alert,
  View,
  Text,
  Animated,
  Easing,
  LayoutAnimation,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useDeleteAssetGroup } from 'api/asset';
import { formatApiError } from 'api/errorFormat';
import { useAsset } from 'core/stateHooks';
import { formatter } from 'core/utils';
import log from 'core/logger';
import Icon from '../Icon/Icon';
import EditOptionsBottomSheet from '../BottomSheet/EditOptionsBottomSheet';
import AssetGroupModal from 'components/Modal/AssetGroupModal';
import { GroupTitleProps } from './types';
import { successToaster } from 'core/toaster';

export default function EditableGroupTitle({
  id,
  title,
  children,
  height,
}: GroupTitleProps) {
  const { mutate: deleteAssetGroupApi } = useDeleteAssetGroup();
  const resetAsset = useAsset((state) => state.resetAsset);

  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [containerHeight, setContainerHeight] = useState(40);

  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: expanded ? ['0deg', '180deg'] : ['180deg', '0deg'],
  });

  const isScreenMountedRef = useRef(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onDelete = () =>
    Alert.alert(
      'Delete this group',
      `Are you sure you want to delete ${title.text}?`,
      [
        {
          text: 'Cancel',
          onPress: () => bottomSheetModalRef.current?.dismiss(),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            deleteAssetGroupApi(
              { id: id as number },
              {
                onSuccess: () => {
                  successToaster('Delete group successfully');
                  log.success('Delete group successfully.');
                  bottomSheetModalRef.current?.dismiss();
                },
                onError: (error) => {
                  log.error('Error: ', formatApiError(error));
                },
              }
            ),
        },
      ]
    );

  const functions = {
    'Add Account': () => {
      resetAsset();
      router.push('/asset/details');
    },
    Edit: () => setShowModal(true),
    Delete: onDelete,
  };

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  useEffect(() => {
    if (isScreenMountedRef.current && height === 0) {
      LayoutAnimation.easeInEaseOut();
      setExpanded(false);
      setContainerHeight(40);
    }
  }, [height]);

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
    <View
      className='p-2 bg-gray-200 rounded-lg'
      style={{ minHeight: containerHeight }}
    >
      <View className='flex-row items-center justify-between w-full rounded-lg'>
        <Pressable
          className='flex-row items-center gap-2 px-2'
          onPress={handlePressSelect}
        >
          <Icon name='edit' size={16} color='#000' />
          <Text className='text-xl font-bold'>{title.text}</Text>
          <Text className='color-gray-500'>({title.number})</Text>
        </Pressable>
        <Pressable
          className='flex-row items-center justify-end gap-2 px-2'
          disabled={title.number === 0}
          onPress={toggleExpand}
        >
          <Text className='color-gray-500'>{formatter(title.amount)}</Text>
          {title.number > 0 && (
            <Animated.View
              style={
                isScreenMountedRef.current ? { transform: [{ rotate }] } : null
              }
            >
              <Icon name='menu-down' size={24} color='#000' />
            </Animated.View>
          )}
        </Pressable>
      </View>
      {expanded && <View className='flex-1 py-2'>{children}</View>}
      <EditOptionsBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        functions={functions}
        title={title.text}
        height={300}
        onCancel={handleCloseSheet}
      />
      <AssetGroupModal
        groupId={id}
        name={title.text}
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
          handleCloseSheet();
        }}
      />
    </View>
  );
}
