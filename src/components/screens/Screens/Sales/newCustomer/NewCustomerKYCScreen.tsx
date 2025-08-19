import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  PermissionsAndroid,
  Platform,
  Modal,
  BackHandler,
  Dimensions,
} from 'react-native';
import NavbarWithSalesIcon from '../../../../../navigation/NavbarWithMoreIcon';
import fontStyles from '../../../../../assets/styles/constants';

import {useNavigation} from '@react-navigation/native';

import Button from '../../../../common/Atoms/buttons/Button';
import CameraIcon from '../../../../../assets/images/svg/Camera';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import InputWithIcon from '../../../../common/Atoms/textInputs/InputWithIcon';
import RNFS from 'react-native-fs';
import Geolocation from 'react-native-geolocation-service';
import Apis from '../../../../../services/apis';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bank from '../../../../../assets/images/svg/Bank';
import Profile from '../../../../../assets/images/svg/Profile';
import AppLoader from '../../../../common/Atoms/AppLoader';
import languages from '../../../../../common/language';

import {Camera} from 'react-native-camera-kit';
import Cam from '../../../../../assets/images/svg/Camera';
import {useAlert} from '../../../../../../AlertContext';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePreview from '../../../../common/Molecules/ImagePreview';

const {width, height} = Dimensions.get('window');
interface CenterData {
  id: number;
  name: string;
  enrolled: number;
  CGT: number;
  icon: string;
}

const NewCustomerKYCScreen: any = ({route}) => {
  const navigation = useNavigation();

  const [docType, setdocType] = useState<string>('');
  const [docTypeSide, setdocTypeSide] = useState<string>('');

  const [pos, setPos] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModalType, setShowModalType] = useState<any>('');
  const [photoStatus, setPhotoStatus] = React.useState<
    'Passed' | 'Failed' | null
  >(null);

  const apis = new Apis();
  const [load, setLoad] = useState(false);
  const [frontID, setfrontID] = useState<any>({});
  const [backID, setbackID] = useState<any>({});
  const [defaultID, setdefaultID] = useState<any>({});
  const [bankPBID, setbankPBID] = useState<any>({});
  const [bankPBURL, setBankPBURL] = useState<any>(null);
  const [bankVerifiedStatus, setBankVerifiedStatus] = useState('');
  const [frontURL, setfrontURL] = useState<any>(null);
  const [backURL, setbackURL] = useState<any>(null);
  const [defaultURL, setdefaultURL] = useState<any>(null);
  const [averified, setAverified] = useState<any>();
  const [vverified, setVverified] = useState<any>();
  const [pverified, setPverified] = useState<any>();
  const [cverified, setCverified] = useState<any>();
  const [selurl, setselurl] = useState<any>();
  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [ifsc, setIfsc] = useState<string>('');
  const [bank, setBank] = useState<string>('');
  const [branch, setBranch] = useState<string>('');
  const [bankAdress, setBankAddress] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [beneficiaryName, setbeneficiaryName] = useState<string>('');
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [toggle5, setToggle5] = useState(false);
  const [cusToggle, setCusToggle] = useState(false);
  const [votToggle, setVotToggle] = useState(false);
  const [kycData, setKycData] = useState<string>('');

  const showAlert = useAlert();

  const calculateBase64Size = (base64String?: string | null) => {
    if (!base64String) return;

    const padding = (base64String.match(/=*$/) || [''])[0].length;
    const base64SizeInBytes = (base64String.length * 3) / 4 - padding;
    const sizeInKB = base64SizeInBytes / 1024;
    const sizeInMB = sizeInKB / 1024;
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to take photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return true; // iOS permissions handled differently
    }
  };

  const captureImage = async (type: any, docTypeSide?: any) => {
    let isCameraPermitted = await requestCameraPermission();

    if (!isCameraPermitted) {
      showAlert(
        languages['Permission denied'][fontStyles.lang],
        languages['Camera permission'][fontStyles.lang],
      );
      return;
    }

    try {
      const image = await ImageCropPicker.openCamera({
        cropping: true,
        freeStyleCropEnabled: true,
        includeExif: true,
        includeBase64: true,
        compressImageQuality: 0.6,
        mediaType: 'photo',
        cropperToolbarTitle: 'Image Crop',
      });
      const imageUri = image?.path;
      const base64String = image?.data;
      calculateBase64Size(base64String);
      if (docTypeSide === 'front') {
        setfrontID({
          type: docTypeSide,
          file_data: base64String,
        });
        setfrontURL(imageUri);
      } else if (docTypeSide === 'back') {
        setbackID({
          type: docTypeSide,
          file_data: base64String,
        });
        setbackURL(imageUri);
      } else if (docTypeSide === 'default') {
        setdefaultID({
          type: docTypeSide,
          file_data: base64String,
        });
        setdefaultURL(imageUri);
      } else if (docTypeSide === 'bankPassBook') {
        setbankPBID(base64String);
        setBankPBURL(imageUri);
      }

      showAlert(
        languages.Success[fontStyles.lang],
        languages['Updated Successfully'][fontStyles.lang],
      );
      setShowModal(false);
    } catch (error) {
      showAlert(
        languages.Error[fontStyles.lang],
        languages['Failed to process image'][fontStyles.lang],
      );
    }
  };

  const handleUploadPhoto = async (type: any, side: any) => {
    setdocType(type);
    setdocTypeSide(side);

    captureImage('photo', side);
  };

  const uploadImage = async () => {
    setLoad(true);
    launchImageLibrary(
      {mediaType: 'photo', maxWidth: 800, maxHeight: 800, quality: 0.6}, //quality: 0.8
      async response => {
        if (response.didCancel) {
          setLoad(false);
          setPhotoStatus(null);
        } else if (response.errorCode) {
          setLoad(false);
          setPhotoStatus('Failed');
          showAlert(


            
            languages.Error[fontStyles.lang],
            response.errorMessage ||
              languages['Unknown error occurred'][fontStyles.lang],
          );
          setShowModal(false);
        } else {
          setLoad(false);
          let url: any = response.assets?.[0]?.uri;
          const base64String = await RNFS.readFile(url, 'base64');
          calculateBase64Size(base64String);

          if (docTypeSide == 'front') {
            setLoad(false);
            setfrontID({
              type: docTypeSide,
              file_data: base64String,
            });
            setfrontURL(url);
          }
          if (docTypeSide == 'back') {
            setLoad(false);
            setbackID({
              type: docTypeSide,
              file_data: base64String,
            });
            setbackURL(url);
          }
          if (docTypeSide == 'default') {
            setLoad(false);
            setdefaultID({
              type: docTypeSide,
              file_data: base64String,
            });
            setdefaultURL(url);
          }
          setPhotoStatus('Passed'); // Upload success
          setLoad(false);
          showAlert(
            languages['Photo Uploaded'][fontStyles.lang],
            languages['Photo added successfully'][fontStyles.lang],
          );
          setShowModal(false);
        }
      },
    );
  };

 
 const imgUpload = async (mode: any) => {
    // setLoad(true);

    if (!pos) {
      showAlert(
        languages.Error[fontStyles.lang],
        languages['Please enable location'][fontStyles.lang],
      );
      return;
    }

    // let body: any = {
    //   _func: 'upload-image',
    //   temporary_id: selData?.tempid,
    //   mode: mode,
    //   type: docType,
    //   latitude: pos?.latitude,
    //   longitude: pos?.longitude,
    //   details: docTypeSide === 'default' ? [defaultID] : [frontID, backID],
    // };

    // if (mode === 'manual') {
    //   body['id_no'] = kycData;
    // }

    // try {
    //   const response: any = await apis.temporaryCustomer(body);
    //   const res = response?.data?.data || [];

    //   showAlert(
    //     languages.Success[fontStyles.lang],
    //     languages['Images Uploaded Successfully'][fontStyles.lang],
    //   );

    //   setShowModal2(false);
    //   setToggle5(false);
    //   setToggle4(false);
    //   setKycData('');
    //   onLoad();
    // } catch (error: any) {
    //   setLoad(false);
    //   onLoad();

    //   if (error.response) {
    //     console.log('Status Code:', error.response.status);
    //     console.log('Response Headers:', error.response.headers);
    //     console.log('Response Data:', error.response.data);

    //     const errorMessage =
    //       error.response.data?.desc ||
    //       languages['Something went wrong'][fontStyles.lang];

    //     showAlert(
    //       languages.Error[fontStyles.lang],
    //       errorMessage == '0'
    //         ? 'OCR Processing Failed, Please go ahead with the Manual KYC Process!!'
    //         : errorMessage,
    //       [
    //         {
    //           text: 'Proceed',
    //           onPress: async () => {
    //             if (errorMessage == '0') {
    //               setToggle5(true); // 👈 open the modal
    //             }
    //             setKycData('');
    //           },
    //         },
    //       ],
    //     );
    //   } else if (error.request) {
    //     console.error('No response received:', error.request);
    //     showAlert(
    //       languages.Error[fontStyles.lang],
    //       languages['No response from server'][fontStyles.lang],
    //     );
    //   } else {
    //     console.error('Error setting up request:', error.message);
    //     showAlert(
    //       languages.Error[fontStyles.lang],
    //       languages['An unexpected error occurred'][fontStyles.lang],
    //     );
    //   }
    // }
  };


  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: languages['Location Permission'][fontStyles.lang],
          message: languages['This app requires'][fontStyles.lang],
          buttonNeutral: languages['Ask Me Later'][fontStyles.lang],
          buttonNegative: languages.Cancel[fontStyles.lang],
          buttonPositive: languages.OK[fontStyles.lang],
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      showAlert(
        languages['Permission denied'][fontStyles.lang],
        languages['Location permission required'][fontStyles.lang],
      );
      return;
    }

    Geolocation.getCurrentPosition(
      (position: any) => {
        let body = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        };
        setPos(body);
      },
      error => {
        console.error(error);
        showAlert(
          languages.Error[fontStyles.lang],
          languages['Unable to fetch location.'][fontStyles.lang],
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    getLocation();
    // onLoad();

    const backAction = () => {
      if (cusToggle) {
        setCusToggle(false);
        setToggle2(false);
        setVotToggle(true);
        return true; // Prevent default back behavior
      } else if (votToggle) {
        setVotToggle(false);
        setToggle(false);
        setToggle2(true);
        return true;
      } else if (toggle2) {
        setToggle2(false);
        setToggle(true);
        setVotToggle(false);
        return true;
      } else if (toggle) {
        return false; // Allow default back behavior
      } else {
        navigation.navigate('CustomerList', {selData});
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [toggle, toggle2, votToggle, cusToggle]);

  const convertImageURLToBase64 = async (
    url: string,
  ): Promise<string | null> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result?.toString().split(',')[1];
          resolve(base64data || null);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Base64 conversion failed', error);
      return null;
    }
  };

 
 
  return (
    <View style={styles.container}>
      <NavbarWithSalesIcon
        title={languages['New Customer'][fontStyles.lang]}
        showBackButton={true}
        // onBackPress={() => navigation.navigate('CustomerList', {selData})}
      />
      <View style={styles.mainContent}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          {/* Step 1 */}
          <TouchableOpacity
            onPress={() => {
              setToggle(true);
              setToggle2(false);
              setVotToggle(false);
              setCusToggle(false);
            }}
            style={{alignItems: 'center', position: 'absolute'}}>
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: fontStyles.colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '600',
                  fontFamily: 'Montserrat-Medium',
                }}>
                {'✓'}
              </Text>
            </View>
            <Text
              style={{
                color: fontStyles.colors.primary,
                marginTop: 6,
                width: 80,
                textAlign: 'center',
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}>
              {languages['UIDAI Verification'][fontStyles.lang]}
            </Text>
          </TouchableOpacity>

          {/* Line 1 */}
          <View
            style={{
              height: 2,
              // flex: 1,
              width: '19%',
              backgroundColor:
                toggle2 || votToggle || cusToggle
                  ? fontStyles.colors.primary
                  : '#ccc',
              marginHorizontal: 4,
              marginTop: -43,
              left: 49,
            }}
          />

          {/* Step 2 */}
          <TouchableOpacity
            onPress={() => {
              // if (averified) {
              setToggle2(true);
              setToggle(false);
              setCusToggle(false);
              setVotToggle(false);
              // }
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              position: 'absolute',
              left: '26%',
            }}>
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor:
                  toggle2 || votToggle || cusToggle
                    ? fontStyles.colors.primary
                    : '#fff',
                borderWidth: 1,
                borderColor: fontStyles.colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color:
                    toggle2 || votToggle || cusToggle
                      ? '#fff'
                      : fontStyles.colors.primary,
                  fontWeight: '600',
                  fontFamily: 'Montserrat-Medium',
                }}>
                {toggle2 || votToggle || cusToggle ? '✓' : '2'}
              </Text>
            </View>
            <Text
              style={{
                color:
                  toggle2 || votToggle || cusToggle
                    ? fontStyles.colors.primary
                    : fontStyles.colors.black,
                marginTop: 6,
                width: 80,
                textAlign: 'center',
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}>
              {languages['Bank Verification'][fontStyles.lang]}
            </Text>
          </TouchableOpacity>

          {/* Line 2 */}
          <View
            style={{
              height: 2,
              // flex: 1,
              width: '20%',
              backgroundColor:
                votToggle || cusToggle ? fontStyles.colors.primary : '#ccc',
              marginHorizontal: 4,
              marginTop: -43,
              left: 50,
            }}
          />

          {/* step 3 */}
          <TouchableOpacity
            onPress={() => {
              // if (customerName) {
              setVotToggle(true);
              setToggle(false);
              setToggle2(false);
              setCusToggle(false);
              // }
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              position: 'absolute',
              left: '53%',
            }}>
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor:
                  votToggle || cusToggle ? fontStyles.colors.primary : '#fff',
                borderWidth: 1,
                borderColor: fontStyles.colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color:
                    votToggle || cusToggle ? '#fff' : fontStyles.colors.primary,
                  fontWeight: '600',
                  fontFamily: 'Montserrat-Medium',
                }}>
                {votToggle || cusToggle ? '✓' : '3'}
              </Text>
            </View>
            <Text
              style={{
                color:
                  votToggle || cusToggle
                    ? fontStyles.colors.primary
                    : fontStyles.colors.black,
                marginTop: 6,
                width: 80,
                textAlign: 'center',
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}>
              {languages['Voter Verification'][fontStyles.lang]}
            </Text>
          </TouchableOpacity>

          {/* Line 3 */}
          <View
            style={{
              height: 2,
              // flex: 1,
              width: '19%',
              backgroundColor: cusToggle ? fontStyles.colors.primary : '#ccc',
              marginHorizontal: 4,
              marginTop: -43,
              left: 51,
            }}
          />

          {/* Step 4 */}
          <TouchableOpacity
            onPress={() => {
              // if (vverified) {
              setCusToggle(true);
              setToggle(false);
              setToggle2(false);
              setVotToggle(false);
              // }
            }}
            style={{alignItems: 'center'}}>
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: cusToggle ? fontStyles.colors.primary : '#fff',
                borderWidth: 1,
                borderColor: fontStyles.colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: cusToggle ? '#fff' : fontStyles.colors.primary,
                  fontWeight: '600',
                  fontFamily: 'Montserrat-Medium',
                }}>
                {cusToggle ? '✓' : '4'}
              </Text>
            </View>
            <Text
              style={{
                color: cusToggle
                  ? fontStyles.colors.primary
                  : fontStyles.colors.black,
                marginTop: 6,
                width: 80,
                textAlign: 'center',
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}>
              {languages['Customer Verification'][fontStyles.lang]}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <ScrollView
            style={{paddingBottom: 0, height: '75%'}}
            showsVerticalScrollIndicator={false}>
            {toggle && (
              <>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>
                    {languages.UIDAI[fontStyles.lang]}
                  </Text>
                </View>
                <View style={styles.expandedSection}>
                  <TouchableOpacity
                    onPress={() => {
                      setfrontID({}), setbackID({});
                      let front = averified?.documents?.filter(
                        (item: any) => item.type == 'front',
                      );
                      let back = averified?.documents?.filter(
                        (item: any) => item.type == 'back',
                      );
                      setfrontURL(front ? front[0]?.cloudfront_url : null),
                        setbackURL(back ? back[0]?.cloudfront_url : null),
                        setShowModal2(true),
                        setShowModalType('aadhaar');
                    }}
                    style={{
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      color: fontStyles.colors.primary,
                      height: 100,
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      marginTop: 20,
                    }}>
                    <View
                      style={[
                        styles.kycContainer,
                        {marginTop: -10, width: '50%'},
                      ]}>
                      <Text style={[styles.kycText]}>
                        {languages['Upload UIDAI'][fontStyles.lang]}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '50%',
                        height: '80%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={require('../../../../../assets/images/aadhaar.webp')}
                        style={[{width: '50%', height: '100%', right: -10}]}
                        resizeMode="contain"
                      />
                      <FontAwesome
                        name={'chevron-circle-right'}
                        size={30}
                        color={fontStyles.colors.primary}
                        style={{}}
                      />
                    </View>
                  </TouchableOpacity>
                  {averified && (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginLeft: 5,
                        alignItems: 'center',
                      }}>
                      {averified.result == 'Passed' && (
                        <FontAwesome
                          name={'check-circle'}
                          size={20}
                          color={'green'}
                          style={{}}
                        />
                      )}
                      {averified.result != 'Passed' && (
                        <FontAwesome
                          name={'times-circle-o'}
                          size={20}
                          color={'#FF6666'}
                          style={{}}
                        />
                      )}
                      <Text
                        style={[
                          styles.iconText,
                          {
                            color:
                              averified.result == 'Passed'
                                ? 'green'
                                : '#FF6666',
                            marginLeft: 5,
                          },
                        ]}>
                        {averified.result == 'Passed'
                          ? languages['UIDAI Verified'][fontStyles.lang]
                          : averified.result}
                      </Text>
                    </View>
                  )}

                  <View style={[styles.signInButton, {marginTop: '90%'}]}>
                    <Button
                      title={languages.Continue[fontStyles.lang]}
                      variant={'contained'}
                      color={fontStyles.colors.primary}
                      disabled={!averified}
                      onPress={() => {
                        if (averified) {
                          setToggle2(true);
                          setToggle(false);
                        }
                      }}
                    />
                  </View>
                </View>
              </>
            )}

            {toggle2 && (
              <>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>
                    {languages['Bank Details'][fontStyles.lang]}
                  </Text>
                </View>
                <View style={styles.expandedSection}>
                  <View style={{flex: 1}}>
                    <InputWithIcon
                      label={languages['IFSC Code'][fontStyles.lang]}
                      placeholder={
                        languages['Enter IFSC Code'][fontStyles.lang]
                      }
                      autoCorrect={false}
                      autoCapitalize="characters"
                      autoComplete="off"
                      textContentType="none"
                      importantForAutofill="no"
                      value={ifsc}
                  
                      maxLength={11}
                      rightIcon={
                        <TouchableOpacity onPress={() => setIfsc('')}>
                          <AntDesign
                            name="closecircleo"
                            size={20}
                            color={fontStyles.colors.lightBrown}
                          />
                        </TouchableOpacity>
                      }
                    />
                    <View style={{}}>
                      <View style={{width: '100%'}}>
                        <InputWithIcon
                          label={languages.Bank[fontStyles.lang]}
                          placeholder={
                            languages['Enter Bank Details'][fontStyles.lang]
                          }
                          value={bank}
                          onChangeText={(val: any) => {
                            setBank(val);
                          }}
                          disabled={true}
                          leftIcon={<Bank color={fontStyles.colors.black} />}
                        />
                      </View>
                      <View style={{width: '100%'}}>
                        <InputWithIcon
                          label={languages['branch'][fontStyles.lang]}
                          placeholder={
                            languages['Enter Branch'][fontStyles.lang]
                          }
                          value={branch}
                          onChangeText={(val: any) => {
                            setBranch(val);
                          }}
                          disabled={true}
                        />
                      </View>
                      <View style={{width: '100%'}}>
                        <InputWithIcon
                          label={languages['Bank Address'][fontStyles.lang]}
                          placeholder={
                            languages['Enter Bank Address'][fontStyles.lang]
                          }
                          value={bankAdress}
                          onChangeText={(val: any) => {
                            setBankAddress(val);
                          }}
                          disabled={true}
                        />
                      </View>
                    </View>

                    <InputWithIcon
                      // ref ={bankref}
                      label={languages['Bank Account Number'][fontStyles.lang]}
                      placeholder={
                        languages['Enter Bank Account Number'][fontStyles.lang]
                      }
                      value={accountNumber}
                      onChangeText={(val: any) => {
                        setAccountNumber(val);
                      }}
                      keyboardType="number-pad"
                    />
                    <InputWithIcon
                      label={
                        languages['Customer Name from App'][fontStyles.lang]
                      }
                      placeholder={
                        languages['Customer Name from App'][fontStyles.lang]
                      }
                      value={customerName}
                      onChangeText={(val: any) => {
                        setCustomerName(val);
                      }}
                      leftIcon={<Profile />}
                      disabled={true}
                    />
                    <InputWithIcon
                      label={
                        languages['Customer Name from Bank'][fontStyles.lang]
                      }
                      placeholder={
                        languages['Customer Name from Bank'][fontStyles.lang]
                      }
                      value={beneficiaryName}
                      onChangeText={(val: any) => {
                        setbeneficiaryName(val);
                      }}
                      leftIcon={<Bank color={fontStyles.colors.black} />}
                      disabled={true}
                    />
                    <View
                      style={[
                        // styles.kycContainer,
                        {
                          borderWidth: 1,
                          borderStyle: 'dashed',
                          borderColor: fontStyles.colors.black,
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        },
                      ]}>
                      <Text style={[styles.kycText, {marginTop: 0}]}>
                        {languages['Bank Passbook Image'][fontStyles.lang]}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setselurl(bankPBURL);
                          setShowModal3(true);
                        }}
                        style={{marginVertical: 10, height: 100, width: 100}}>
                        {bankPBURL && (
                          <Image
                            source={{uri: bankPBURL}}
                            style={[{height: 100, objectFit: 'contain'}]}
                            resizeMode="contain"
                          />
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          backgroundColor: fontStyles.colors.secondary,
                          padding: 10,
                          borderRadius: 100,
                        }}
                        onPress={() => {
                          captureImage('photo', 'bankPassBook');
                        }}>
                        <Cam />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            )}

            {votToggle && (
              <>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>
                    {languages['Voter ID Details'][fontStyles.lang]}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setfrontID({}), setbackID({});

                    let front = vverified?.documents?.filter(
                      (item: any) => item.type == 'front',
                    );
                    let back = vverified?.documents?.filter(
                      (item: any) => item.type == 'back',
                    );
                    setfrontURL(front ? front[0]?.cloudfront_url : null),
                      setbackURL(back ? back[0]?.cloudfront_url : null),
                      setShowModal2(true),
                      setShowModalType('voterid');
                  }}
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    color: fontStyles.colors.primary,
                    height: 100,
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginTop: 20,
                  }}>
                  <View style={[styles.kycContainer, {marginTop: -10}]}>
                    <Text style={[styles.kycText]}>
                      {languages['Upload Voter ID'][fontStyles.lang]}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      height: '80%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={require('../../../../../assets/images/voterID.png')}
                      style={[{width: '50%', height: '100%', right: -10}]}
                      resizeMode="contain"
                    />
                    <FontAwesome
                      name={'chevron-circle-right'}
                      size={30}
                      color={fontStyles.colors.primary}
                      style={{}}
                    />
                  </View>
                </TouchableOpacity>
                {vverified && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      marginLeft: 5,
                      alignItems: 'center',
                    }}>
                    {vverified.result == 'Passed' && (
                      <FontAwesome
                        name={'check-circle'}
                        size={20}
                        color={'green'}
                        style={{}}
                      />
                    )}
                    {vverified.result != 'Passed' && (
                      <FontAwesome
                        name={'times-circle-o'}
                        size={20}
                        color={'#FF6666'}
                        style={{}}
                      />
                    )}
                    <Text
                      style={[
                        styles.iconText,
                        {
                          color:
                            vverified.result == 'Passed' ? 'green' : '#FF6666',
                          marginLeft: 5,
                        },
                      ]}>
                      {vverified.result == 'Passed'
                        ? languages['Voter ID Verified'][fontStyles.lang]
                        : vverified.result}
                    </Text>
                  </View>
                )}
                <View style={[styles.signInButton, {marginTop: '95%'}]}>
                  <Button
                    title={languages.Continue[fontStyles.lang]}
                    variant={'contained'}
                    color={
                      // !(averified&&vverified&&cverified)?'#ddd':
                      fontStyles.colors.primary
                    }
                    disabled={!vverified}
                    // disabled={!(averified&&vverified&&cverified)}
                    onPress={() => {
                      if (vverified) {
                        setVotToggle(false);
                        setToggle2(false);
                        setToggle(false);
                        setCusToggle(true);
                      }
                    }}
                  />
                </View>
              </>
            )}
            {cusToggle && (
              <>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>
                    {languages['Customer Photo'][fontStyles.lang]}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setdefaultID({}),
                      setdefaultURL(
                        cverified
                          ? cverified.documents[0].cloudfront_url
                          : null,
                      ),
                      setShowModal2(true),
                      setShowModalType('customer');
                  }}
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    color: fontStyles.colors.primary,
                    height: 100,
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginTop: 20,
                  }}>
                  <View
                    style={[
                      styles.kycContainer,
                      {marginTop: -10, width: '50%'},
                    ]}>
                    <Text style={[styles.kycText, {lineHeight: 24}]}>
                      {languages['Customer Photo'][fontStyles.lang]}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      height: '80%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={require('../../../../../assets/images/userProfille.jpg')}
                      style={[{width: '50%', height: '100%', right: -10}]}
                      resizeMode="contain"
                    />
                    {/* { photoStatus != 'Passed' && ( */}
                    <FontAwesome
                      name={'chevron-circle-right'}
                      size={30}
                      color={fontStyles.colors.primary}
                      style={{}}
                    />
                  </View>
                </TouchableOpacity>
                {cverified && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      marginLeft: 5,
                      alignItems: 'center',
                    }}>
                    {cverified.result == 'Passed' && (
                      <FontAwesome
                        name={'check-circle'}
                        size={20}
                        color={'green'}
                        style={{}}
                      />
                    )}

                    <Text
                      style={[
                        styles.iconText,
                        {
                          color:
                            cverified.result == 'Passed' ? 'green' : '#FF6666',
                          marginLeft: 5,
                        },
                      ]}>
                      {cverified.result == 'Passed'
                        ? languages['Customer Verified'][fontStyles.lang]
                        : cverified.result}
                    </Text>
                  </View>
                )}
              </>
            )}
            {/* </View> */}
          </ScrollView>
          {!toggle && !toggle2 && !votToggle && (
            <View style={styles.signInButton}>
              <Button
                title={languages.Proceed[fontStyles.lang]}
                variant={'contained'}
                color={fontStyles.colors.primary}
                disabled={!cverified}
                onPress={() => verifyImgs()}
              />
            </View>
          )}
        </View>
      </View>

      <Modal
        visible={showModal}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          top: -50,
          height: '90%',
        }}>
        <View
          style={{
            marginHorizontal: 35,
            top: 30,
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              uploadImage();
            }}
            style={{
              marginTop: 20,
              width: '100%',
              height: 51,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: fontStyles.colors.primary,
              borderRadius: 100,
            }}>
            <Text
              style={{
                // color: fontStyles.colors.black,
                fontSize: 14,
                fontWeight: '600',
                fontFamily: 'Montserrat-SemiBold',
                color: '#fff',
              }}>
              {languages['CHOOSE FROM GALLERY'][fontStyles.lang]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => captureImage('photo')}
            style={{
              marginTop: 20,
              width: '100%',
              height: 51,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: fontStyles.colors.primary,
              borderRadius: 100,
            }}>
            <Text
              style={{
                color: fontStyles.colors.black,
                fontSize: 14,
                fontWeight: '600',
                fontFamily: 'Montserrat-SemiBold',
                color: '#fff',
              }}>
              {languages['TAKE A PHOTO'][fontStyles.lang]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowModal(false);
            }}
            style={{
              marginTop: 20,
              width: '100%',
              height: 51,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: fontStyles.colors.white,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: fontStyles.colors.primary,
            }}>
            <Text
              style={{
                color: fontStyles.colors.black,
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'Montserrat-SemiBold',
                color: fontStyles.colors.primary,
              }}>
              {languages.CANCEL[fontStyles.lang]}
            </Text>
          </TouchableOpacity>
        </View>
        {load && <AppLoader />}
      </Modal>

      <Modal
        visible={showModal2}
        style={{
          backgroundColor: fontStyles.colors.white,
          top: -50,
          height: '90%',
        }}>
        <View
          style={{
            // top: 30,
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: fontStyles.colors.white,
            // backgroundColor:'red'
          }}>
          {(showModalType == 'voterid' || showModalType == 'aadhaar') && (
            <View style={{paddingHorizontal: 16, width: '100%'}}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    showAlert('Coming Soon!!');
                  }}
                  style={{
                    gap: 16,
                    backgroundColor: fontStyles.colors.secondary,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    height: 40,
                    shadowColor: fontStyles.colors.white,
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 3,
                  }}>
                  <Image
                    source={require('../../../../../assets/images/Scan.png')}
                    style={[{width: 24, height: 24}]}
                    resizeMode="contain"
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-Medium',
                      fontWeight: 600,
                      lineHeight: 20,
                      letterSpacing: 0.5,
                      color: fontStyles.colors.white,
                    }}>
                    {languages['Scan QR'][fontStyles.lang]}
                  </Text>
                  {/* </View> */}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: 12,
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setToggle4(!toggle4);
                    setToggle3(false);
                  }}
                  style={{
                    gap: 16,
                    backgroundColor: fontStyles.colors.paleRed,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    height: 40,
                    shadowColor: fontStyles.colors.white,
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 3,
                  }}>
                  <Image
                    source={require('../../../../../assets/images/photo.png')}
                    style={[{width: 24, height: 24}]}
                    resizeMode="contain"
                  />
                  {/* <View style={{borderWidth: 2}}> */}
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-Medium',
                      fontWeight: 600,
                      lineHeight: 20,
                      letterSpacing: 0.5,
                      color: fontStyles.colors.primary,
                    }}>
                    {/* {languages['Capture Photo'][fontStyles.lang]} */}
                    Capture{' '}
                    {showModalType == 'voterid'
                      ? 'Voter ID'
                      : showModalType == 'aadhaar'
                      ? 'Aadhaar'
                      : showModalType == 'customer'
                      ? 'Customer'
                      : ''}{' '}
                    photo
                  </Text>
                  {/* </View> */}
                </TouchableOpacity>
              </View>
            </View>
          )}

          {showModalType == 'customer' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                width: '100%',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={[styles.title, {marginBottom: 50, fontSize: 20}]}>
                  {languages['Upload Customer Photo'][fontStyles.lang]}
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    color: fontStyles.colors.primary,
                    height: 150,
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.camera,
                      {
                        position: 'absolute',
                        right: -10,
                        top: -10,
                        zIndex: 10,
                      },
                    ]}
                    onPress={() => handleUploadPhoto('Photo', 'default')}>
                    <CameraIcon />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (defaultURL) {
                        setselurl(defaultURL);
                        setShowModal3(true);
                      }
                    }}>
                    <Image
                      source={
                        defaultURL
                          ? {uri: defaultURL}
                          : require('../../../../../assets/images/userProfille.jpg')
                      }
                      style={[{width: '80%', height: '80%'}]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.frontbackTxt}>
                  {languages['Customer Photo'][fontStyles.lang]}
                </Text>
              </View>
            </View>
          )}
          {showModalType == 'customer' && (
            <View style={{marginTop: 50, width: '90%'}}>
              <Button
                title={languages['Confirm Upload'][fontStyles.lang]}
                variant={'contained'}
                color={fontStyles.colors.primary}
                disabled={
                  showModalType === 'customer'
                    ? !defaultID.type
                    : !(frontID.type && backID.type)
                }
                onPress={() => {
                  imgUpload('ocr');
                }}
              />
            </View>
          )}

          <TouchableOpacity
            style={{position: 'absolute', right: 30, top: 30}}
            onPress={() => setShowModal2(false)}>
            <SearchIcon
              name="closecircleo"
              size={22}
              // color={fontStyles.colors.black}
              color={'fff'}
              style={{position: 'absolute', right: -15, top: -10}}
            />
          
          </TouchableOpacity>
        </View>
        {load && <AppLoader />}
      </Modal>

      <Modal
        visible={toggle3}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
          }}>
          <Text style={[styles.title, {marginBottom: 20, fontSize: 20}]}>
            {languages['Scan Qr Here'][fontStyles.lang]}
          </Text>

          <View style={{gap: 16, alignItems: 'center', width: '100%'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                fontWeight: 400,
                letterSpacing: 0.25,
                lineHeight: 20,
                color: fontStyles.colors.black,
              }}>
              {languages['Align the'][fontStyles.lang]}{' '}
              {showModalType == 'voterid'
                ? languages.Voter[fontStyles.lang]
                : showModalType == 'aadhaar'
                ? languages['Aadhar ID'][fontStyles.lang]
                : showModalType == 'pan'
                ? languages.PAN[fontStyles.lang]
                : languages.Image[fontStyles.lang]}{' '}
              {languages['QR code'][fontStyles.lang]}
            </Text>
            <View
              style={{
                height: '55%',
                width: '85%',
              }}>
              <Camera
                scanBarcode={true}
                onReadCode={event => showAlert('QR code found')}
                showFrame={true}
                laserColor="red"
                frameColor="white"
                colorForScannerFrame={'black'}
                style={{flex: 1}}
              />
            </View>
            <View style={{marginTop: 50, width: '90%'}}>
              <Button
                title={languages.Proceed[fontStyles.lang]}
                variant={'contained'}
                color={fontStyles.colors.primary}
                onPress={() => {
                  setToggle5(true);
                  setKycData('');
                  setToggle3(false);
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{position: 'absolute', right: 30, top: 30}}
            onPress={() => setToggle3(false)}>
            {/* <MaterialIcons
              name="close"
              size={30}
              color={fontStyles.colors.white}
            /> */}
            <SearchIcon
              name="closecircleo"
              size={25}
              // color={fontStyles.colors.white}
              //  color={fontStyles.colors.black}
              color={'fff'}
              style={{position: 'absolute', right: -15, top: -10}}
            />
          </TouchableOpacity>
        </View>
        {load && <AppLoader />}
      </Modal>

      <Modal
        visible={toggle4}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          top: -50,
          height: '90%',
        }}>
        <View
          style={{
            // top: 30,
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            //  backgroundColor:'red'
            // backgroundColor: fontStyles.colors.white,
          }}>
          <Text style={[styles.title, {marginBottom: 20, fontSize: 22}]}>
            {languages.Upload[fontStyles.lang]}{' '}
            {showModalType == 'voterid'
              ? languages['Voter ID'][fontStyles.lang]
              : showModalType == 'aadhaar'
              ? languages.UIDAI[fontStyles.lang]
              : showModalType == 'pan'
              ? languages.PAN[fontStyles.lang]
              : languages.Image[fontStyles.lang]}
          </Text>
          {showModalType == 'voterid' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                width: '100%',
              }}>
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    color: fontStyles.colors.primary,
                    height: 150,
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.camera,
                      {
                        position: 'absolute',
                        right: -10,
                        top: -10,
                        zIndex: 10,
                      },
                    ]}
                    onPress={() => handleUploadPhoto('Voter Card', 'front')}>
                    <CameraIcon />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (frontURL) {
                        setselurl(frontURL);
                        setShowModal3(true);
                      }
                    }}>
                    <Image
                      source={
                        frontURL
                          ? {uri: frontURL}
                          : require('../../../../../assets/images/frontID.png')
                      }
                      style={[{width: '80%', height: '80%'}]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.frontbackTxt}>
                  {languages['Front Photo'][fontStyles.lang]}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    color: fontStyles.colors.primary,
                    height: 150,
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.camera,
                      {
                        position: 'absolute',
                        right: -10,
                        top: -10,
                        zIndex: 10,
                      },
                    ]}
                    onPress={() => handleUploadPhoto('Voter Card', 'back')}>
                    <CameraIcon />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (backURL) {
                        setselurl(backURL);
                        setShowModal3(true);
                      }
                    }}>
                    <Image
                      source={
                        backURL
                          ? {uri: backURL}
                          : require('../../../../../assets/images/backID.png')
                      }
                      style={[{width: '80%', height: '80%'}]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.frontbackTxt}>
                  {languages['Back Photo'][fontStyles.lang]}
                </Text>
              </View>
            </View>
          )}

          {showModalType == 'aadhaar' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                width: '100%',
              }}>
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    color: fontStyles.colors.primary,
                    height: 150,
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.camera,
                      {
                        position: 'absolute',
                        right: -10,
                        top: -10,
                        zIndex: 10,
                      },
                    ]}
                    onPress={() => handleUploadPhoto('Aadhaar Card', 'front')}>
                    <CameraIcon />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (frontURL) {
                        setselurl(frontURL);
                        setShowModal3(true);
                      }
                    }}>
                    <Image
                      source={
                        frontURL
                          ? {uri: frontURL}
                          : require('../../../../../assets/images/frontID.png')
                      }
                      style={[{width: '80%', height: '80%'}]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.frontbackTxt}>
                  {languages['Front Photo'][fontStyles.lang]}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    color: fontStyles.colors.primary,
                    height: 150,
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.camera,
                      {
                        position: 'absolute',
                        right: -10,
                        top: -10,
                        zIndex: 10,
                      },
                    ]}
                    onPress={() => handleUploadPhoto('Aadhaar Card', 'back')}>
                    <CameraIcon />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (backURL) {
                        setselurl(backURL);
                        setShowModal3(true);
                      }
                    }}>
                    <Image
                      source={
                        backURL
                          ? {uri: backURL}
                          : require('../../../../../assets/images/backID.png')
                      }
                      style={[{width: '80%', height: '80%'}]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.frontbackTxt}>
                  {languages['Back Photo'][fontStyles.lang]}
                </Text>
              </View>
            </View>
          )}

          {showModalType == 'pan' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                width: '100%',
              }}>
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    color: fontStyles.colors.primary,
                    height: 150,
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.camera,
                      {
                        position: 'absolute',
                        right: -10,
                        top: -10,
                        zIndex: 10,
                      },
                    ]}
                    onPress={() => handleUploadPhoto('Pan Card', 'front')}>
                    <CameraIcon />
                  </TouchableOpacity>
                  <Image
                    source={
                      frontURL
                        ? {uri: frontURL}
                        : require('../../../../../assets/images/frontID.png')
                    }
                    style={[{width: '80%', height: '80%'}]}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.frontbackTxt}>
                  {languages['Front Photo'][fontStyles.lang]}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    color: fontStyles.colors.primary,
                    height: 150,
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.camera,
                      {
                        position: 'absolute',
                        right: -10,
                        top: -10,
                        zIndex: 10,
                      },
                    ]}
                    onPress={() => handleUploadPhoto('Pan Card', 'back')}>
                    <CameraIcon />
                  </TouchableOpacity>
                  <Image
                    source={
                      backURL
                        ? {uri: backURL}
                        : require('../../../../../assets/images/backID.png')
                    }
                    style={[{width: '80%', height: '80%'}]}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.frontbackTxt}>
                  {languages['Back Photo'][fontStyles.lang]}
                </Text>
              </View>
            </View>
          )}

          <View style={{marginTop: 50, width: '90%'}}>
            <Button
              title={languages['Confirm Upload'][fontStyles.lang]}
              variant={'contained'}
              color={fontStyles.colors.primary}
              disabled={
                showModalType === 'customer'
                  ? !defaultID.type
                  : !(frontID.type && backID.type)
              }
              onPress={() => {
                imgUpload('ocr');
              }}
            />
          </View>

          <TouchableOpacity
            style={{position: 'absolute', right: 30, top: 30}}
            onPress={() => setToggle4(false)}>
            {/* <MaterialIcons
              name="close"
              size={30}
              color={fontStyles.colors.white}
            /> */}
            <SearchIcon
              name="closecircleo"
              size={22}
              // color={fontStyles.colors.black}
              //  color={fontStyles.colors.black}
              color={'#000'}
              style={{position: 'absolute', right: -15, top: -10}}
            />
          </TouchableOpacity>
        </View>
        {load && <AppLoader />}
      </Modal>

      <Modal
        visible={toggle5}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          // top: -50,
          height: '90%',
        }}>
        <View
          style={{
            // top: 30,
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: fontStyles.colors.white,
          }}>
          <Text
            style={[
              styles.title,
              {marginBottom: 20, fontSize: 28, textAlign: 'center'},
            ]}>
            {languages.Enter[fontStyles.lang]}{' '}
            {showModalType == 'voterid'
              ? languages['Voter ID'][fontStyles.lang]
              : showModalType == 'aadhaar'
              ? languages.UIDAI[fontStyles.lang]
              : showModalType == 'pan'
              ? languages.PAN[fontStyles.lang]
              : languages.Image[fontStyles.lang]}{' '}
            {languages.Number[fontStyles.lang]}
          </Text>
          <View style={{width: '85%'}}>
            <InputWithIcon
              label={`Enter ${
                showModalType == 'voterid'
                  ? languages['Voter ID'][fontStyles.lang]
                  : showModalType == 'aadhaar'
                  ? languages.UIDAI[fontStyles.lang]
                  : showModalType == 'pan'
                  ? languages.PAN[fontStyles.lang]
                  : languages.Image[fontStyles.lang]
              }`}
              placeholder={`Enter ${
                showModalType == 'voterid'
                  ? languages['Voter ID'][fontStyles.lang]
                  : showModalType == 'aadhaar'
                  ? languages.UIDAI[fontStyles.lang]
                  : showModalType == 'pan'
                  ? languages.PAN[fontStyles.lang]
                  : languages.Image[fontStyles.lang]
              }`}
              value={kycData}
              onChangeText={(val: any) => {
                let regex;

                if (showModalType === 'aadhaar') {
                  regex = /^\d{0,4}\s?\d{0,4}\s?\d{0,4}$/;
                } else if (showModalType === 'pan') {
                  regex = /^[A-Z]{0,5}[0-9]{0,4}[A-Z]{0,1}$/;
                } else if (showModalType === 'voterid') {
                  regex = /^[A-Z]{0,3}[0-9]{0,7}$/;
                  // regex = /^[A-Z0-9/]{0,20}$/; // Updated regex
                }

                if (!regex || regex.test(val.toUpperCase())) {
                  setKycData(val.toUpperCase());
                }
              }}
            />
          </View>
          <View style={{marginTop: 50, width: '90%'}}>
            <Button
              title={languages.Continue[fontStyles.lang]}
              variant={'contained'}
              color={fontStyles.colors.primary}
              disabled={!kycData}
              onPress={() => {
                imgUpload('manual');
              }}
            />
          </View>

          <TouchableOpacity
            style={{position: 'absolute', right: 30, top: 70}}
            onPress={() => setToggle5(false)}>
            {/* <MaterialIcons
              name="close"
              size={30}
              color={fontStyles.colors.black}
            /> */}
            <SearchIcon
              name="closecircleo"
              size={22}
              color={'fff'}
              // color={fontStyles.colors.black}
              style={{position: 'absolute', right: -15, top: -10}}
            />
          </TouchableOpacity>
        </View>
        {load && <AppLoader />}
      </Modal>

      {/**\============image preview modal============ */}
      {showModal3 && (
        <ImagePreview
          visible={showModal3}
          onClose={() => setShowModal3(false)}
          url={selurl}
        />
      )}

      {load && <AppLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fontStyles.colors.white,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: fontStyles.spacing.paddingHorizontal,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    color: fontStyles.colors.primary,
    marginVertical: 12,
    // lineHeight: 24,
    letterSpacing: 0.5,
  },
  itemRow: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {
    // marginLeft: 10,
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  progressBar: {
    marginTop: 16,
  },
  signInButton: {
    flex: 1,
    marginBottom: 26,
    justifyContent: 'flex-end',
    borderRadius: 30,
  },
  kycContainer: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kycText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
    color: fontStyles.colors.black,
    marginTop: 20,
  },
  camera: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fontStyles.colors.secondary,
  },
  card: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    marginTop: 16,
    justifyContent: 'space-around',
    borderBottomWidth: 0.5,
    borderBottomColor: fontStyles.colors.primary,
  },
  leftSection: {
    // paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  labelContainer: {
    flex: 1,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: fontStyles.colors.primary,
    fontFamily: 'Montserrat-Bold',
    // marginLeft: 20,
    // marginBottom: 4,
  },
  expandedSection: {
    marginTop: 16,
    zIndex: 1,
    // backgroundColor: '#FFFBFB',
  },
  rowButton: {
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
    borderRadius: 30,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  halfBtnContainer: {
    width: '48%',
  },

  frontbackTxt: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: fontStyles.colors.cyan,
    marginTop: 10,
  },
});

export default NewCustomerKYCScreen;
