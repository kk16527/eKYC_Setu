import React, {FC, useState} from 'react';
import {
  Dimensions,
  Modal,
  TouchableOpacity,
  View,
  Image,
  Text,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageZoom from 'react-native-image-pan-zoom';
import fontStyles from '../../../assets/styles/constants';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-blob-util';
import AppLoader from '../Atoms/AppLoader';
import {useAlert} from '../../../../AlertContext';
import SearchIcon from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get('window');

interface ButtonProps {
  visible: boolean; // Text for the button
  url: string;
  onClose: () => void;
}
const ImagePreview: FC<ButtonProps> = ({visible, url, onClose}) => {
  const [load, setLoad] = useState(false);

  const requestDownloadPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted');
          return true;
        } else {
          Alert.alert(
            'Permission Denied',
            'Storage permission is required to download files.',
          );
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      // iOS does not need explicit permission for downloads
      return true;
    }
  };

  const showAlert = useAlert();

  const requestPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 30) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to storage to save images.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  
  

  const downloadImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'Cannot download image without permission.',
      );
      return;
    }

    setLoad(true); // ✅ Show loader

    const {config, fs} = RNFetchBlob;
    const fileName = `DOC-${Date.now()}.jpeg`;
    const downloadPath = `/storage/emulated/0/Download/${fileName}`;

    try {
      const res = await config({
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: downloadPath,
          description: 'Downloading image',
          title: fileName,
          mime: 'image/jpeg',
          mediaScannable: true,
        },
      }).fetch('GET', url);

      // console.log('Download complete', `File saved to: ${res.path()}`);
      // Alert.alert('Download complete', `File saved to: ${res.path()}`);
       showAlert('Success', `Image downloaded successfully:\n${res.path()}`);
    } catch (e: any) {
      Alert.alert('Download failed', e.message);
    } finally {
      setLoad(false); // ✅ Hide loader
    }
  };

  return (
    <View>
      <Modal visible={visible} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: fontStyles.colors.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* ✅ ZOOMABLE IMAGE */}
          {/* {url.includes("http") && (<TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 100,
              backgroundColor: fontStyles.colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute', left: 30, top: 30, zIndex: 1
            }}
            onPress={downloadImage}>
            <Text style={{ color: 'white', fontSize: 14 }}>Download</Text>
          </TouchableOpacity>)} */}
          {load && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2,
              }}>
              <AppLoader />
            </View>
          )}

          {url && url.includes('http') && (
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 100,
                backgroundColor: fontStyles.colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                left: 30,
                top: 30,
                zIndex: 1,
              }}
              onPress={downloadImage}>
              <Text style={{color: 'white', fontSize: 14}}>Download</Text>
            </TouchableOpacity>
          )}

          <ImageZoom
            cropWidth={width}
            cropHeight={height}
            imageWidth={width * 0.8}
            imageHeight={height * 0.8}
            minScale={1}
            maxScale={3}>
            <Image
              source={{uri: url}}
              style={{
                width: width * 0.8,
                height: height * 0.8,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </ImageZoom>

          <TouchableOpacity
            style={{position: 'absolute', right: 30, top: 30, zIndex: 1}}
            onPress={onClose}>
                <SearchIcon
                    name="closecircleo"
                    size={22}
                    color={fontStyles.colors.black}
                    style={{position: 'absolute', right: -15, top: -10}}
                  />
            {/* <MaterialIcons
              name="close"
              size={30}
              color={fontStyles.colors.black}
            /> */}
            
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ImagePreview;
