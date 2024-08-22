import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import {
  CameraView,
  type CameraType,
  type FlashMode,
  type CameraCapturedPicture,
} from 'expo-camera';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import log from 'core/logger';
import Icon from '../Icon/Icon';

const flashOptions = ['auto', 'on', 'off'];

export default function Camera() {
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
        })
        .then((photoData: CameraCapturedPicture) => {
          setPreviewVisible(true);
          setCapturedImage(photoData);
        });
    }
  };

  const handleSavePhoto = () => {
    if (!permissionResponse?.granted) requestPermission();
    MediaLibrary.saveToLibraryAsync(
      (capturedImage as CameraCapturedPicture).uri
    ).then(() => {
      setCapturedImage(undefined);
      router.navigate('record');
    });
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
              <TouchableOpacity
                onPress={() => setPreviewVisible(false)}
                className='items-center justify-center h-12 bg-black rounded-lg w-36'
              >
                <Text className='text-xl color-white'>Re-take</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSavePhoto}
                className='items-center justify-center h-12 bg-black rounded-lg w-36'
              >
                <Text className='text-xl color-white'>Save</Text>
              </TouchableOpacity>
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
            <View className='absolute flex-row items-center justify-between w-full px-8 top-10 '>
              <TouchableOpacity onPress={() => router.navigate('record')}>
                <Icon name='close' size={24} color='#fff' />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFlash}>
                <MaterialIcons name={`flash-${flash}`} size={24} color='#fff' />
              </TouchableOpacity>
            </View>
            <View className='absolute flex-row items-center justify-between w-full px-8 bottom-5 '>
              <TouchableOpacity onPress={handleOpenCameraRoll}>
                <MaterialIcons name='photo-library' size={32} color='#fff' />
              </TouchableOpacity>
              <View className='items-center self-center p-2 border-2 border-white rounded-xl'>
                <TouchableOpacity
                  onPress={handleTakePicture}
                  className='bottom-0 w-16 h-16 bg-white rounded-xl'
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setType((current) => (current === 'back' ? 'front' : 'back'));
                }}
              >
                <MaterialIcons name='flip-camera-ios' size={32} color='#fff' />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      )}
    </View>
  );
}
