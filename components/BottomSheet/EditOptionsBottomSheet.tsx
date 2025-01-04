import { View, Text, Pressable } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from './BottomSheet';

type EditOptionsBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  functions: { [functionName: string]: () => void };
  title: string;
  height?: number;
  onCancel: () => void;
};

const bgColorPicker = (item: string) => {
  switch (item) {
    case 'Delete':
      return 'bg-red-500';
    case 'Pause':
      return 'bg-amber-500';
    case 'Resume':
      return 'bg-green-500';
    default:
      return 'bg-blue-400';
  }
};

export default function EditOptionsBottomSheet({
  bottomSheetModalRef,
  functions,
  title,
  height,
  onCancel,
}: EditOptionsBottomSheetProps) {
  return (
    <BottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      height={height ?? 320}
    >
      <View className='items-center justify-between w-full gap-4 px-4'>
        <Text className='text-2xl font-bold dark:color-white'>{title}</Text>
        <View className='w-full'>
          {Object.keys(functions).map((item, index) => (
            <Pressable
              key={item}
              className={`py-3 border-white border-2 rounded-lg dark:border-zinc-600 
                ${bgColorPicker(item)}`}
              onPress={functions[item]}
            >
              <Text className='text-lg text-center color-white'>{item}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          className='w-full py-3 border-2 border-gray-500 rounded-lg dark:border-gray-300'
          onPress={onCancel}
        >
          <Text className='text-lg text-center dark:color-white'>Cancel</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
}
