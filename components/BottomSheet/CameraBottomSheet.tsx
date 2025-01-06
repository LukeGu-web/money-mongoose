import {
  Alert,
  View,
  Text,
  Linking,
  Pressable,
  ActivityIndicator,
} from 'react-native';
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
import { successToaster, infoToaster } from 'core/toaster';

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
    switch (permission?.status) {
      case 'undetermined':
        requestPermission();
        break;
      case 'granted':
        router.push({ pathname: '/media/camera', params: { type } });
        break;
      case 'denied':
        return Alert.alert(
          'Camera Permission',
          `This app needs permission to access your camera to take photos.\n\nTo enable camera access:\n\n1. Click 'Go to Settings'\n2. Toggle Camera`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'Go to Settings', onPress: () => Linking.openSettings() },
          ]
        );
    }
  };

  const handleOpenCameraRoll = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        quality: 0.5,
      });
      if (!result.canceled) {
        const base64Image =
          `data:${result.assets[0].mimeType};base64,` + result.assets[0].base64;
        if (type === 'avatar') {
          updateUserApi(
            { id: user.id, avatar: base64Image },
            {
              onSuccess: (response) => {
                successToaster('Update user avatar successfully');
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
        infoToaster('You did not select any image.');
      }
    } else {
      return Alert.alert(
        'Photos Permission',
        `This app needs permission to access your camera roll to select photos.\n\nTo enable photos access:\n\n1. Click 'Go to Settings'\n2. Tap Photos\n3. Select 'Full Access' or 'Limited Access' `,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'Go to Settings', onPress: () => Linking.openSettings() },
        ]
      );
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
            <Text className='text-2xl font-semibold dark:color-white'>
              Select Picture
            </Text>
          </View>
          <View className='items-start flex-1 w-full gap-4 mt-6'>
            <Pressable
              className='flex-row items-center justify-center w-full gap-4 py-4 bg-blue-900 rounded-lg'
              onPress={handleOpenCamera}
            >
              <FontAwesome name='camera-retro' size={24} color='white' />
              <Text className='text-2xl font-medium color-white'>Camera</Text>
            </Pressable>
            <Pressable
              className='flex-row items-center justify-center w-full gap-4 py-4 bg-blue-900 rounded-lg'
              onPress={handleOpenCameraRoll}
            >
              <FontAwesome5 name='photo-video' size={24} color='white' />
              <Text className='text-2xl font-medium color-white'>Gallery</Text>
            </Pressable>
          </View>
        </View>
      )}
    </BottomSheet>
  );
}
