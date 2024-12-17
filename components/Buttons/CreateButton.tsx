import { Text, Pressable, ActivityIndicator } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

type CreateButtonProps = {
  onPress: () => void;
  isPending: boolean;
  targetId: number;
};

export default function CreateButton({
  targetId,
  isPending,
  onPress,
}: CreateButtonProps) {
  const offset = { closed: -30, opened: -4 };
  return (
    <KeyboardStickyView offset={offset}>
      <Pressable
        className='items-center w-full p-2 bg-yellow-300 rounded-lg'
        onPress={onPress}
      >
        {isPending ? (
          <ActivityIndicator size='small' />
        ) : (
          <Text className='text-lg font-semibold'>
            {targetId > 0 ? 'Update' : 'Create'}
          </Text>
        )}
      </Pressable>
    </KeyboardStickyView>
  );
}
