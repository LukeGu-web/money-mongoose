import { View, Text, Pressable } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from './BottomSheet';

type EditAssetGroupBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  functions: { [functionName: string]: () => void };
  title: string;
  height?: number;
  onCancel: () => void;
};

export default function EditAssetGroupBottomSheet({
  bottomSheetModalRef,
  functions,
  title,
  height,
  onCancel,
}: EditAssetGroupBottomSheetProps) {
  return (
    <BottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      height={height ?? 320}
    >
      <View className='items-center justify-between w-full gap-4 px-4'>
        <Text className='text-2xl font-bold'>{title}</Text>
        <View className='w-full'>
          {Object.keys(functions).map((item, index) => (
            <Pressable
              key={item}
              className={`py-3 border-white border-2 rounded-lg ${
                item === 'Delete' ? 'bg-red-500' : 'bg-blue-400'
              }`}
              style={{ borderColor: '#fff' }}
              onPress={functions[item]}
            >
              <Text className='text-lg text-center color-white'>{item}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          className='w-full py-3 border-2 border-gray-500 rounded-lg'
          onPress={onCancel}
        >
          <Text className='text-lg text-center'>Cancel</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
}
