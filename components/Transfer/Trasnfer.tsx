import { useRef, useState } from 'react';
import { View, Text, Pressable, Keyboard } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { BookType } from 'api/types';
import { useRecord, useBookStore } from 'core/stateHooks';
import SelectAssetBottomSheet from 'components/BottomSheet/SelectAssetBottomSheet';

type TargetType = 'from_asset' | 'to_asset';

export default function Transfer() {
  const { getCurrentBook } = useBookStore();
  const { record, setRecord } = useRecord();
  const [target, setTarget] = useState<TargetType>('from_asset');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressSelect = (value: TargetType) => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
    setTarget(value);
    if (!record[target]) {
      const flatAssets = (getCurrentBook() as BookType).groups.flatMap(
        (group) => group.assets
      );
      if (flatAssets.length > 0) {
        const defaultAsset = flatAssets[0];
        setRecord({ [target]: `${defaultAsset.id}-${defaultAsset.name}` });
      }
    }
  };
  return (
    <View className='items-center justify-center flex-1 gap-4'>
      <Pressable
        className='items-center justify-center w-4/5 p-6 bg-gray-100 rounded-lg'
        onPress={() => handlePressSelect('from_asset')}
      >
        <Text className='text-lg '>
          {record.from_asset ? record.from_asset.split('-')[1] : 'From account'}
        </Text>
      </Pressable>
      <View className='p-4 rotate-90 rounded-full bg-amber-300'>
        <FontAwesome name='exchange' size={24} color='black' />
      </View>
      <Pressable
        className='items-center justify-center w-4/5 p-6 bg-gray-100 rounded-lg'
        onPress={() => handlePressSelect('to_asset')}
      >
        <Text className='text-lg '>
          {record.to_asset ? record.to_asset.split('-')[1] : 'To account'}
        </Text>
      </Pressable>
      <SelectAssetBottomSheet
        target={target}
        value={record[target]}
        bottomSheetModalRef={bottomSheetModalRef}
      />
    </View>
  );
}
