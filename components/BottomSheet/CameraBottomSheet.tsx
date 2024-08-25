import { View, Text, Pressable } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import log from 'core/logger';
import BottomSheet from './BottomSheet';
import Icon from '../Icon/Icon';

type CameraBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function CameraBottomSheet({
  bottomSheetModalRef,
}: CameraBottomSheetProps) {
  const [permission, requestPermission] = useCameraPermissions();

  const handleOpenCamera = () => {
    bottomSheetModalRef.current?.dismiss();
    if (!permission?.granted) requestPermission();
    router.navigate('/media/camera');
  };

  const handleOpenCameraRoll = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      log.info(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={250}>
      <View className='items-center justify-center flex-1 w-full px-6'>
        <View className='flex-row items-center w-full gap-2 px-4'>
          <Text className='text-2xl font-semibold'>Select Picture</Text>
        </View>
        <View className='items-start flex-1 w-full gap-4 mt-6'>
          <Pressable
            className='flex-row items-center justify-center w-full gap-4 py-4 bg-blue-900 rounded-lg'
            onPress={handleOpenCamera}
          >
            <FontAwesome name='camera-retro' size={24} color='#fff' />
            <Text className='text-2xl font-medium color-white'>Camera</Text>
          </Pressable>
          <Pressable
            className='flex-row items-center justify-center w-full gap-4 py-4 bg-blue-900 rounded-lg'
            onPress={handleOpenCameraRoll}
          >
            <FontAwesome5 name='photo-video' size={24} color='#fff' />
            <Text className='text-2xl font-medium color-white'>Gallery</Text>
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
}
