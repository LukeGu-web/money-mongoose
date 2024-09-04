import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { useUpdateUser } from 'api/account';
import { formatApiError } from 'api/errorFormat';
import { useUserStore } from 'core/stateHooks';
import log from 'core/logger';
import BottomSheet from './BottomSheet';

type CameraBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  type: string; // avatar | record
};

export default function CameraBottomSheet({
  bottomSheetModalRef,
  type,
}: CameraBottomSheetProps) {
  const { user, setUser } = useUserStore();
  const { mutate: updateUserApi, isPending } = useUpdateUser();
  const [permission, requestPermission] = useCameraPermissions();

  const handleOpenCamera = () => {
    bottomSheetModalRef.current?.dismiss();
    if (!permission?.granted) requestPermission();
    router.navigate({ pathname: '/media/camera', params: { type } });
  };

  const handleOpenCameraRoll = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      const base64Image =
        `data:${result.assets[0].mimeType};base64,` + result.assets[0].base64;
      console.log(`data:${result.assets[0].mimeType};base64,`);
      if (type === 'avatar') {
        updateUserApi(
          { id: user.id, avatar: base64Image },
          {
            onSuccess: (response) => {
              log.success('Update user avatar success:', response);
              setUser({ ...user, avatar: response.avatar });
              bottomSheetModalRef.current?.dismiss();
            },
            onError: (error) => {
              log.error(
                'Upload image from gallery: Error: ',
                formatApiError(error)
              );
            },
          }
        );
      }
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={250}>
      {isPending ? (
        <View className='items-center justify-center flex-1'>
          <ActivityIndicator size='large' />
        </View>
      ) : (
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
      )}
    </BottomSheet>
  );
}
