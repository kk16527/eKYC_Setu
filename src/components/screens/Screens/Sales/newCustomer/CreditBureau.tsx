import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';
import NavbarWithSalesIcon from '../../../../../navigation/NavbarWithMoreIcon';
import fontStyles from '../../../../../assets/styles/constants';
import Location from '../../../../../assets/images/svg/Location';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '../../../../common/Atoms/progressBar/ProgressBar';
import Button from '../../../../common/Atoms/buttons/Button';
import CheckBoxes from '../../../../common/Atoms/CheckBoxes';
import Apis from '../../../../../services/apis';
import {useAlert} from '../../../../../../AlertContext';
import languages from '../../../../../common/language';
import AppLoader from '../../../../common/Atoms/AppLoader';

interface CenterData {
  id: number;
  name: string;
  enrolled: number;
  CGT: number;
  icon: string;
}

const CreditBureau: any = ({route}) => {
  const {selData} = route.params;
  console.log('=====???', selData);
  const data: any = {
    id: selData?.center_code,
    name: selData?.center_name,
    enrolled: '',
    CGT: '',
    icon: 'home',
    lat: selData.latitude,
    long: selData.longitude,
    // add: (
    //   selData.district +
    //   ' ' +
    //   selData.state_name +
    //   ' - ' +
    //   selData.pincode
    // ).trim(),
    add: (
      (selData?.district || '') +
      ' ' +
      (selData?.village_state || selData?.village_state || '') +
      ' - ' +
      (selData?.pincode || '')
    ).trim(),
  };
  const navigation = useNavigation();

  const [isCBSuccess, setIsCBSuccess] = useState(false);
  const [progress, setProgress] = useState(0.4);
  const [subProgress, setSubProgress] = useState(0.95);
  const apis = new Apis();
  const [load, setLoad] = useState(false);
  const [resData, setResData] = useState<any>();
  const [toggle, setToggle] = useState(false);
  const [isCB, setisCB] = useState(false);

  const [rules, setRules] = useState<any>([]);
  const showAlert = useAlert();

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

  const checkCB = async () => {
    setLoad(true);
    console.log('>>>', selData?.tempid);
    apis
      .temporaryCustomer({
        _func: 'check-staging-credit-bureau',
        temporary_id: selData?.tempid,
      })
      .then((response: any) => {
        // console.log('check-staging-credit-bureau', response.data.data);
        setisCB(true);
        setToggle(true);

        try {
          const res2 = response?.data?.data || [];
          // console.log('res2===', JSON.stringify(res2)); // console.log("'check-staging-credit-bureau", res2);
          apis
            .temporaryCustomer({
              _func: 'verify-staging-credit-bureau',
              temporary_id: selData?.tempid,
            })
            .then((response: any) => {
              try {
                const res3 = response?.data?.data || [];

                setRules(res3.rule_status);
                setLoad(false);
                setIsCBSuccess(true);
              } catch (error: any) {
                setLoad(false);
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
              languages['An unexpected error occurred'][fontStyles.lang],
            );
          }
          setLoad(false);
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
            languages['An unexpected error occurred'][fontStyles.lang],
          );
        }
        setLoad(false);
      });
  };
  const onLoad = () => {
    setLoad(true);
    apis
      .temporaryCustomer({
        _func: 'get-temporary-customer-details',
        temporary_id: selData?.tempid,
      })

      .then((response: any) => {
        // console.log(selData?.tempid);
        try {
          const res = response?.data?.data || [];
          setResData(res);

          setLoad(false);
        } catch (error: any) {
          setLoad(false);
          if (error.response) {
            console.log(
              'Status Code=======================:',
              error.response.status,
            );
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
        _func: 'create-customer',
        temporary_id: selData?.tempid,
      })
      .then((response: any) => {
        try {
          const res = response?.data || [];
          showAlert(
            languages.Success[fontStyles.lang],
            languages['Partial Enrolment Completed'][fontStyles.lang],
          );
          navigation.navigate('CustomerList', {selData: selData});
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
        title={languages['Credit Bureau'][fontStyles.lang]}
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
            <Text style={styles.iconText}>{data?.add}</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <ProgressBar progress={progress} subProgress={subProgress} />
        </View>
        <View style={{flex: 1}}>
          <View style={styles.nameContainer}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <View>
                <Text style={styles.nameText}>
                  {resData?.name?.toUpperCase()} / {resData?._temp_id}
                </Text>
                <Text style={styles.nameSubText}>
                  {resData?.contact} / {resData?.dob}
                </Text>
              </View>
              <Text style={styles.subContainer}>
                {languages.Self[fontStyles.lang]}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* Kyc card section */}
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  title={languages['CCR Report'][fontStyles.lang]}
                  // title={languages['Check CB'][fontStyles.lang]}
                  variant={'contained'}
                  color={fontStyles.colors.primary}
                  onPress={() => {
                    // ccReport();
                    navigation.navigate('CcrReport', {tempid: selData?.tempid});
                  }}
                  disabled={!isCBSuccess}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title={languages['Check CB'][fontStyles.lang]}
                  variant={'contained'}
                  color={fontStyles.colors.primary}
                  onPress={() => {
                    checkCB();
                  }}
                />
              </View>
            </View>
            {toggle && (
              <View style={[styles.expandableSection, {marginTop: 5}]}>
                <Text style={styles.expandableTopText}>
                  {languages['Rule List'][fontStyles.lang]}
                </Text>

                {rules.map((item: any, index: any) => (
                  <View key={index}>
                    <View style={styles.checkBoxContainer}>
                      <Text style={[styles.expandableText, {width: '90%'}]}>
                        {`${languages['Rule'][fontStyles.lang]} - ${index + 1}`}{' '}
                        {item.rule_name}
                      </Text>
                      <CheckBoxes
                        isChecked={item.result}
                        onCheck={() => {
                          // setIsChecked(!isChecked)
                        }}
                        checkedColor={fontStyles.colors.darkGreen}
                        uncheckedColor={fontStyles.colors.strongRed}
                      />
                    </View>
                    <View style={styles.subDivider} />
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.signInButton}>
            <Button
              title={languages['Create Customer'][fontStyles.lang]}
              variant={'contained'}
              color={fontStyles.colors.primary}
              disabled={!isCB}
              onPress={() => {
                updateCustomer();
              }}
            />
          </View>
        </View>
      </View>
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
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {
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
    marginBottom: 20,
    justifyContent: 'flex-end',
    borderRadius: 30,
  },
  nameContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    borderRadius: 8,
    padding: 8,
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
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: fontStyles.colors.cetaBlue,
    marginTop: 10,
  },
  subContainer: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.darkPink,
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',

    marginTop: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    width: '40%',
  },
  expandableSection: {
    width: '100%',
    padding: 5,
  },
  expandableTopText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontWeight: 700,
    color: fontStyles.colors.darkBrown,
    lineHeight: 20,
    letterSpacing: 0.25,
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  expandableText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    fontWeight: 500,
    color: fontStyles.colors.black,

    letterSpacing: 0.1,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subDivider: {
    width: '100%',
    height: 1,
    backgroundColor: fontStyles.colors.darkPink,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '30%',
  },
});

export default CreditBureau;
