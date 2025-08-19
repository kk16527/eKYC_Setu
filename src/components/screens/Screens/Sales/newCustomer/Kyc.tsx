import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import NavbarWithSalesIcon from '../../../../../navigation/NavbarWithMoreIcon';
import fontStyles from '../../../../../assets/styles/constants';
import Location from '../../../../../assets/images/svg/Location';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '../../../../common/Atoms/progressBar/ProgressBar';
import Button from '../../../../common/Atoms/buttons/Button';
import KycCard from '../../../../common/Atoms/cards/KycCard';
import Apis from '../../../../../services/apis';
import {useAlert} from '../../../../../../AlertContext';
import languages from '../../../../../common/language';
import AppLoader from '../../../../common/Atoms/AppLoader';
import ImagePreview from '../../../../common/Molecules/ImagePreview';
const {width, height} = Dimensions.get('window');

const Kyc: any = ({route}: any) => {
  const {selData} = route.params;
  // console.log('===dd==========>', selData);
  const data: any = {
    id: selData?.center_code,
    name: selData?.center_name,
    enrolled: '',
    CGT: '',
    icon: 'home',
    lat: selData.latitude,
    long: selData.longitude,
    // add: (
    //   selData?.district +
    //   ' ' +
    //   selData?.state_name +
    //   ' - ' +
    //   selData?.pincode
    // ).trim(),
    add: (
      (selData?.district || '') +
      ' ' +
      (selData?.village_state || selData?.village_state|| '') +
      ' - ' +
      (selData?.pincode || '')
    ).trim(),
  };
  console.log('dataKYC', data.id);
  const navigation: any = useNavigation();
  const [progress, setProgress] = useState(0.4);
  const [subProgress, setSubProgress] = useState(0.8);
  const apis = new Apis();
  const [load, setLoad] = useState(false);
  const [resData, setResData] = useState<any>();
  const [averified, setAverified] = useState<any>();
  const [vverified, setVverified] = useState<any>();
  const [pverified, setPverified] = useState<any>();
  const [cverified, setCverified] = useState<any>();
  const [showModal3, setShowModal3] = useState(false);

  const showAlert = useAlert();

  const {width, height} = Dimensions.get('window');
  const [selurl, setselurl] = useState<any>();

  const openGoogleMaps = () => {
    const label = 'Center Location';
    const url = `https://www.google.com/maps?q=${selData.latitude},${
      selData.longitude
    }(${selData?.name + ' - ' + label})`;

    Linking.openURL(url).catch(() => {
      showAlert(
        languages.Error[fontStyles.lang],
        languages['Failed to open.'][fontStyles.lang],
      );
    });
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    setLoad(true);
    apis
      .temporaryCustomer({
        _func: 'get-temporary-customer-details',
        temporary_id: selData?.tempid,
      })
      .then((response: any) => {
        try {
          const res = response?.data?.data || [];
          setResData(res);
          res.verification.map((item: any) => {
            if (item.id_type == 'AC') {
              setAverified(item);
            }
            if (item.id_type == 'VC') {
              setVverified(item);
            }
            if (item.id_type == 'PC') {
              setPverified(item);
            }
            if (item.id_type == 'PT') {
              setCverified(item);
            }
          });
          setLoad(false);
        } catch (error: any) {
          if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Headers:', error.response.headers);
            console.log('Response Data:', error.response.data);

            const errorMessage =
              error.response.data?.desc ||
              languages['Something went wrong'][fontStyles.lang];
            showAlert(languages.Error[fontStyles.lang], errorMessage);
          } else if (error.request) {
            console.error('No response received:', error.request);
            showAlert(
              languages.Error[fontStyles.lang],
              languages['No response from server'][fontStyles.lang],
            );
          } else {
            console.error('Error setting up request:', error.message);
            showAlert(
              languages.Error[fontStyles.lang],
              languages['An unexpected error'][fontStyles.lang],
            );
          }
        }
      })
      .catch((error: any) => {
        if (error.response) {
          console.log('Status Code:', error.response.status);
          console.log('Response Headers:', error.response.headers);
          console.log('Response Data:', error.response.data);

          const errorMessage =
            error.response.data?.desc ||
            languages['Something went wrong'][fontStyles.lang];
          showAlert(languages.Error[fontStyles.lang], errorMessage);
        } else if (error.request) {
          console.error('No response received:', error.request);
          showAlert(
            languages.Error[fontStyles.lang],
            languages['No response from server'][fontStyles.lang],
          );
        } else {
          console.error('Error setting up request:', error.message);
          showAlert(
            languages.Error[fontStyles.lang],
            languages['An unexpected error'][fontStyles.lang],
          );
        }
        setLoad(false);
      });
  };

  const updateCustomer = () => {
    setLoad(true);
    apis
      .temporaryCustomer({
        _func: 'submit-staging-kyc-preview',
        temp_id: selData.tempid,
      })
      .then((response: any) => {
        try {
          const res = response?.data?.data || [];

          navigation.navigate('CreditBureau', {selData});
          setLoad(false);
        } catch (error: any) {
          if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Headers:', error.response.headers);
            console.log('Response Data:', error.response.data);

            const errorMessage =
              error.response.data?.desc ||
              languages['Something went wrong'][fontStyles.lang];
            showAlert(languages.Error[fontStyles.lang], errorMessage);
          } else if (error.request) {
            console.error('No response received:', error.request);
            showAlert(
              languages.Error[fontStyles.lang],
              languages['No response from server'][fontStyles.lang],
            );
          } else {
            console.error('Error setting up request:', error.message);
            showAlert(
              languages.Error[fontStyles.lang],
              languages['An unexpected error'][fontStyles.lang],
            );
          }
        }
      })
      .catch((error: any) => {
        if (error.response) {
          console.log('Status Code:', error.response.status);
          console.log('Response Headers:', error.response.headers);
          console.log('Response Data:', error.response.data);

          const errorMessage =
            error.response.data?.desc ||
            languages['Something went wrong'][fontStyles.lang];
          showAlert(languages.Error[fontStyles.lang], errorMessage);
        } else if (error.request) {
          console.error('No response received:', error.request);
          showAlert(
            languages.Error[fontStyles.lang],
            languages['No response from server'][fontStyles.lang],
          );
        } else {
          console.error('Error setting up request:', error.message);
          showAlert(
            languages.Error[fontStyles.lang],
            languages['An unexpected error'][fontStyles.lang],
          );
        }
        setLoad(false);
      });
  };

  return (
    <View style={styles.container}>
      <NavbarWithSalesIcon
        title={languages.Kyc[fontStyles.lang]}
        showBackButton={true}
      />
      <View style={styles.mainContent}>
        <Text style={styles.title}>{data?.name}</Text>
        <View style={styles.itemRow}>
          <TouchableOpacity
            onPress={openGoogleMaps}
            style={styles.iconContainer}>
            <Text style={styles.iconText}>
              {languages['Center ID'][fontStyles.lang]} : {data?.id}
            </Text>

            <Location color={fontStyles.colors.darkRed} />
          </TouchableOpacity>
          <View style={styles.detailsContainer}>
            <Text style={styles.iconText}>{data.add}</Text>
          </View>
        </View>

        <View></View>
        <View style={styles.progressBar}>
          <ProgressBar progress={progress} subProgress={subProgress} />
        </View>
        <ScrollView
          style={{height: '65%'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {resData?.name?.toUpperCase()} / {resData?._temp_id}
            </Text>
            <Text style={styles.nameSubText}>
              {resData?.contact} / {resData?.dob}
            </Text>
            <Text style={styles.subContainer}>
              {languages['Partial Enrolled'][fontStyles.lang]}
            </Text>
          </View>
          {/* Kyc card section */}
          <View style={styles.cardContainer}>
            <View style={styles.cardItem}>
              {/* <KycCard
                title={languages['Voter'][fontStyles.lang]}
                desc={languages['Voter Response'][fontStyles.lang]}
                frontURL={vverified?.documents?.[1]?.cloudfront_url}
                backURL={vverified?.documents?.[0]?.cloudfront_url}
                data={vverified}
                onPress={(url: any) => {
                  setselurl(url);
                  // setShowModal3(true);
                }}
              /> */}
              {(() => {
                let front = vverified?.documents?.filter(
                  (item: any) => item.type === 'front',
                );
                let back = vverified?.documents?.filter(
                  (item: any) => item.type === 'back',
                );

                return (
                  <KycCard
                    title={languages['V ID'][fontStyles.lang]}
                    desc={languages['Voter Response'][fontStyles.lang]}
                    frontURL={front ? front[0].cloudfront_url : null}
                    backURL={back ? back[0].cloudfront_url : null}
                    data={vverified}
                    onPress={(url: any) => {
                      setselurl(url);
                      setShowModal3(true);
                    }}
                  />
                );
              })()}
            </View>
            <View style={styles.cardItem}>
              {/* <KycCard
                title={languages.UIDAI[fontStyles.lang]}
                desc={languages['UIDAI Response'][fontStyles.lang]}
                frontURL={averified?.documents?.[1]?.cloudfront_url}
                backURL={averified?.documents?.[0]?.cloudfront_url}
                data={averified}
                onPress={(url: any) => {
                  setselurl(url);
                  // setShowModal3(true);
                }}
              /> */}

              {(() => {
                let front = averified?.documents?.filter(
                  (item: any) => item.type === 'front',
                );
                let back = averified?.documents?.filter(
                  (item: any) => item.type === 'back',
                );

                return (
                  <KycCard
                    title={languages.UIDAI[fontStyles.lang]}
                    desc={languages['UIDAI Response'][fontStyles.lang]}
                    frontURL={front ? front[0].cloudfront_url : null}
                    backURL={back ? back[0].cloudfront_url : null}
                    data={averified}
                    onPress={(url: any) => {
                      setselurl(url);
                      setShowModal3(true);
                    }}
                  />
                );
              })()}
            </View>
            <View style={[styles.cardItem, {alignItems: 'center'}]}>
              <Text style={styles.title}> Customer</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: fontStyles.colors.black,
                  height: 100,
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (cverified?.documents[0]?.cloudfront_url) {
                      setselurl(cverified?.documents[0]?.cloudfront_url);
                      setShowModal3(true);
                    }
                  }}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      cverified?.documents[0]?.cloudfront_url
                        ? {
                            uri: cverified?.documents[0]?.cloudfront_url,
                          }
                        : require('../../../../../assets/images/userProfille.jpg')
                    }
                    style={[{width: '80%', height: '80%'}]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.signInButton}>
          <Button
            title={languages.Proceed[fontStyles.lang]}
            variant={'contained'}
            color={fontStyles.colors.primary}
            onPress={() => updateCustomer()}
          />
        </View>
      </View>
      {/* ✅ Modal for image zoom and preview */}
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
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: fontStyles.colors.primary,
    marginTop: 12,
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

  progressBar: {
    marginTop: 10,
  },
  signInButton: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'flex-end',
    borderRadius: 30,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  nameContainer: {
    width: '100%',
    alignItems: 'flex-start',

    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    padding: 10,
  },
  nameText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.1,
    color: fontStyles.colors.darkBrown,
  },
  nameSubText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.darkBrown,
  },
  subContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: fontStyles.colors.secondary,
    borderRadius: 6,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.cyan,
    marginTop: 8,
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardItem: {
    width: '100%',
    marginVertical: 10,
  },
  iconText: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 20,
    letterSpacing: 0.1,
    fontSize: 12,
    fontWeight: '500',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Kyc;
