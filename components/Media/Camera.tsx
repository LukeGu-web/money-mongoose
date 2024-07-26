import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  type CameraCapturedPicture,
} from 'expo-camera';
import { router } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';
import MediaLibrary from 'expo-media-library';

import Icon from '../Icon/Icon';

type CameraProps = {
  onClose: () => void;
};

export default function Camera() {
  const [type, setType] = useState<CameraType>('back');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>();

  const cameraRef = useRef(null);
  const onTakePicture = () => {
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

  return (
    <View style={styles.container}>
      {previewVisible ? (
        <ImageBackground
          source={{ uri: capturedImage && capturedImage.uri }}
          style={styles.container}
        >
          <View style={styles.btnGroup}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() => setPreviewVisible(false)}
                style={styles.textBtn}
              >
                <Text style={styles.textBtntext}>Re-take</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={savePhoto}
                style={styles.textBtn}
              >
                <Text style={styles.textBtntext}>save photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <CameraView style={{ flex: 1 }} ref={cameraRef} facing={type}>
          <View style={styles.cameraContainer}>
            <View style={styles.camTopBtnGroup}>
              <TouchableOpacity onPress={() => router.navigate('record')}>
                <Icon name='close' size={24} color='#fff' />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name='flash-auto' size={24} color='#fff' />
              </TouchableOpacity>
            </View>
            <View style={styles.camBottomBtnGroup}>
              <TouchableOpacity>
                <MaterialIcons name='photo-library' size={32} color='#fff' />
              </TouchableOpacity>
              <View style={styles.takeBtnWrapper}>
                <TouchableOpacity
                  onPress={onTakePicture}
                  style={styles.takeBtn}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnGroup: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 15,
  },
  textBtn: {
    width: 130,
    height: 40,
    alignItems: 'center',
    borderRadius: 4,
  },
  textBtntext: {
    color: '#fff',
    fontSize: 20,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  camTopBtnGroup: {
    position: 'absolute',
    top: '10%',
    width: '100%',
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  camBottomBtnGroup: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  takeBtnWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    padding: 4,
  },
  takeBtn: {
    width: 60,
    height: 60,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});
