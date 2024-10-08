import { useRef } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CameraBottomSheet from '../BottomSheet/CameraBottomSheet';
import { useUserStore } from 'core/stateHooks';

const avatarImage = require('../../assets/icon.png');

export default function AvatarSection() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const user = useUserStore((state) => state.user);
  return (
    <View className='flex-row items-center gap-8 p-6 mb-4 rounded-lg bg-sky-200 dark:bg-sky-900'>
      <Pressable
        className='rounded-full bg-zinc-100'
        onPress={() => bottomSheetModalRef.current?.present()}
      >
        <Image
          source={user.avatar ? { uri: user.avatar } : avatarImage}
          className='w-20 h-20 rounded-full'
        />
        <View className='absolute bottom-0 right-0 items-center justify-center w-6 h-6 bg-gray-100 rounded-full'>
          <MaterialCommunityIcons
            name='camera-outline'
            size={16}
            color='#03045E'
          />
        </View>
      </Pressable>
      <Text className='text-lg font-bold color-zinc-700 dark:color-white'>
        {user.nickname}
      </Text>
      <CameraBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        type='avatar'
      />
    </View>
  );
}
