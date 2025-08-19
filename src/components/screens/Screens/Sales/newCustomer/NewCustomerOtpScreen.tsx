import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NavbarWithMoreIcon from '../../../../../navigation/NavbarWithMoreIcon';
import fontStyles from '../../../../../assets/styles/constants';

import InputWithIcon from '../../../../common/Atoms/textInputs/InputWithIcon';
import Call from '../../../../../assets/images/svg/Call';
import OtpSection from '../../../../common/Molecules/OtpSection';
import Button from '../../../../common/Atoms/buttons/Button';
import Apis from '../../../../../services/apis';
import {useAlert} from '../../../../../../AlertContext';
import languages from '../../../../../common/language';

const NewCustomerOtpScreen: any = ({route}) => {
  const navigation = useNavigation();
  const [value, setValue] = useState<string>('');
  const [counter, setCounter] = useState(60);
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

  const [otpSuccessMessage, setOtpSuccessMessage] = useState<any>('');
  const [isFromRoute, setIsFromRoute] = useState(false);

  const [isValid, setISValid] = useState<any>(false);
  const apis = new Apis();
  const [load, setLoad] = useState(false);
  const [tempid, setTempId] = useState<any>();

  const validateAndTriggerApi = (val: any) => {
    // console.log("validateAndTriggerApi",val)
    const mobileRegex = /^[6-9]\d{9}$/;
    setValue(val);
    if (val.length === 10 && mobileRegex.test(val)) {
      setLoad(true);
      setISValid(true);
    }
  };

  const verifyOtp = (val: any) => {
    const eopt = val.join('');
    setLoad(true);
    navigation.navigate('NewCustomerKYC');
  };

  return (
    <View style={styles.container}>
      <NavbarWithMoreIcon
        title={languages['New Customer'][fontStyles.lang]}
        showBackButton={true}
      />
      <View style={styles.mainContent}>
        {/* otp screen */}
        <View style={{flex: 1}}>
          <View style={{marginBottom: -8}}>
            <InputWithIcon
              label={languages['Mobile Number'][fontStyles.lang]}
              placeholder={languages['Enter Mobile'][fontStyles.lang]}
              value={value}
              onChangeText={val => {
                if (!isFromRoute) {
                  validateAndTriggerApi(val);
                }
              }}
              rightIcon={<Call />}
              keyboardType="phone-pad"
              editable={!isFromRoute}
            />
          </View>

          <Text style={styles.inputText}>
            {languages['Mobile Customer'][fontStyles.lang]}
          </Text>

          {isValid && (
            <View>
              <Text style={styles.otpMsg}>{otpSuccessMessage}</Text>
              <OtpSection
                otps={otp}
                handleOtp={(eotp: any) => setOtp(eotp)}
                width={20}
                height={20}
              />

              <View style={styles.expireContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setIsFromRoute(false);
                    setCounter(60);
                  }}
                  disabled={counter > 0}>
                  <Text
                    style={[
                      styles.resendButton,
                      counter > 0 && {color: fontStyles.colors.dimGrey}, // Grey text jab disable
                    ]}>
                    {counter === 0
                      ? languages.Resend[fontStyles.lang]
                      : `Did't Receive code OTP in 00:${counter}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={styles.signInButton}>
            <Button
              title={languages.Verify[fontStyles.lang]}
              variant={'contained'}
              color={fontStyles.colors.primary}
              // disabled={!isOtpValid}
              onPress={() => {
                verifyOtp(otp);
              }}
            />
          </View>
        </View>
      </View>
      {/* {load && <AppLoader />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '30%',
  },
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
    lineHeight: 24,
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
  textContainer: {
    justifyContent: 'space-between',
    // height: '40%',
  },
  inputText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '400',
    color: fontStyles.colors.greyBlack,
    // marginBottom: 10,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  description: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '400',
    color: fontStyles.colors.greyBlack,
    marginBottom: 10,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  expireContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alreadyText: {
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 20,
    letterSpacing: 0.1,
    fontSize: 12,
    fontWeight: '500',
    color: fontStyles.colors.primary,
  },
  resendButton: {
    fontFamily: 'Montserrat-SemiBold',
    color: fontStyles.colors.primary,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  signInButton: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'flex-end',
    borderRadius: 30,
  },
  otpMsg: {
    color: 'green',
    fontSize: 10,
    // marginStart: 5,
    marginVertical: 10,
  },
});

export default NewCustomerOtpScreen;
