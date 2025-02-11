import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  CameraView,
  type CameraType,
  type FlashMode,
  type CameraCapturedPicture,
} from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

import { useUpdateUser } from 'api/account';
import { formatApiError } from 'api/errorFormat';
import { useUserStore } from 'core/stateHooks';
import log from 'core/logger';
import Icon from '../Icon/Icon';

const flashOptions = ['auto', 'on', 'off'];

export default function Camera() {
  const params = useLocalSearchParams();
  const { type: photoSaveType } = params;
  const { user, setUser } = useUserStore();
  const { mutate: updateUserApi, isPending } = useUpdateUser();

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const [type, setType] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('auto');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>();

  const cameraRef = useRef(null);
  const handleTakePicture = () => {
    if (cameraRef.current) {
      (cameraRef.current as any)
        .takePictureAsync({
          skipProcessing: true,
          base64: true,
          quality: 0.5,
        })
        .then((photoData: CameraCapturedPicture) => {
          setPreviewVisible(true);
          setCapturedImage(photoData);
        });
    }
  };

  const handleSavePhoto = () => {
    if (!permissionResponse?.granted) requestPermission();
    const base64Image =
      'data:image/jpg;base64,' +
      (capturedImage as CameraCapturedPicture).base64;
    updateUserApi(
      { id: user.id, avatar: base64Image },
      {
        onSuccess: (response) => {
          log.success('Update user avatar success:', response);
          setUser({ ...user, avatar: response.avatar });
          MediaLibrary.saveToLibraryAsync(
            (capturedImage as CameraCapturedPicture).uri
          ).then(() => {
            setCapturedImage(undefined);
            router.back();
          });
        },
        onError: (error) => {
          log.error('Error: ', formatApiError(error));
        },
      }
    );
  };

  const handleFlash = () => {
    let n = flashOptions.indexOf(flash);
    n = n < 2 ? n + 1 : 0;
    setFlash(flashOptions[n] as FlashMode);
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
    <View className='flex-1'>
      {previewVisible ? (
        <ImageBackground
          source={{ uri: capturedImage && capturedImage.uri }}
          className='flex-1'
        >
          <View className='justify-end flex-1 mb-8'>
            <View className='flex-row justify-between p-8'>
              <Pressable
                onPress={() => setPreviewVisible(false)}
                className='items-center justify-center h-12 bg-black rounded-lg w-36'
              >
                <Text className='text-xl color-white'>Re-take</Text>
              </Pressable>
              <Pressable
                disabled={isPending}
                onPress={handleSavePhoto}
                className='items-center justify-center h-12 bg-black rounded-lg w-36'
              >
                {isPending ? (
                  <ActivityIndicator size='small' color='white' />
                ) : (
                  <Text className='text-xl color-white'>Save</Text>
                )}
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <CameraView
          style={{ flex: 1 }}
          ref={cameraRef}
          facing={type}
          flash={flash}
        >
          <View className='flex-row flex-1 bg-transparent'>
            <View className='absolute flex-row items-center justify-between w-full px-8 top-20 '>
              <Pressable onPress={() => router.back()}>
                <Icon name='close' size={24} color='white' />
              </Pressable>
              <Pressable onPress={handleFlash}>
                <MaterialIcons
                  name={`flash-${flash}`}
                  size={24}
                  color='white'
                />
              </Pressable>
            </View>
            <View className='absolute flex-row items-center justify-between w-full px-8 bottom-10 '>
              <Pressable onPress={handleOpenCameraRoll}>
                <MaterialIcons name='photo-library' size={32} color='white' />
              </Pressable>
              <View className='items-center self-center p-2 border-2 border-white rounded-full'>
                <Pressable
                  onPress={handleTakePicture}
                  className='bottom-0 w-16 h-16 bg-white rounded-full'
                />
              </View>
              <Pressable
                onPress={() => {
                  setType((current) => (current === 'back' ? 'front' : 'back'));
                }}
              >
                <MaterialIcons name='flip-camera-ios' size={32} color='white' />
              </Pressable>
            </View>
          </View>
        </CameraView>
      )}
    </View>
  );
}
