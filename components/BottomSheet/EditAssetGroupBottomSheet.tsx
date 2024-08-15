import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from './BottomSheet';

type EditAssetGroupBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  funtions: { [functionName: string]: () => void };
  title: string;
  height?: number;
  onCancel: () => void;
};

export default function EditAssetGroupBottomSheet({
  bottomSheetModalRef,
  funtions,
  title,
  height,
  onCancel,
}: EditAssetGroupBottomSheetProps) {
  return (
    <BottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      height={height ?? 280}
    >
      <View className='items-center justify-between w-full gap-4 px-4'>
        <Text className='text-2xl font-bold'>{title}</Text>
        <View className='w-full'>
          {Object.keys(funtions).map((item, index) => (
            <TouchableOpacity
              key={item}
              className={`py-3 border-white border-2 rounded-md ${
                item === 'Delete' ? 'bg-red-500' : 'bg-blue-400'
              }`}
              style={{ borderColor: '#fff' }}
              onPress={funtions[item]}
            >
              <Text className='text-lg text-center color-white'>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          className='w-full py-3 mt-1 border-2 border-gray-500 rounded-md'
          onPress={onCancel}
        >
          <Text className='text-lg text-center'>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}
