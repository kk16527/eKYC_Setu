import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';

import Button from '../../../../common/Atoms/buttons/Button';
import fontStyles from '../../../../../assets/styles/constants';
import languages from '../../../../../common/language';
import AppLoader from '../../../../common/Atoms/AppLoader';
import NetInfo from '@react-native-community/netinfo';
import SearchIcon from 'react-native-vector-icons/AntDesign';

interface PopUpProps {
  isVisible?: any;
  onClose: () => void;
  resend?: any;
  verify?: any;
  load?: any;
  setload?: any;
  message?: string;
}

const OtpVerificationScreen: React.FC<PopUpProps> = ({
  isVisible,
  onClose,
  resend,
  verify,
  load,
  setload,
  message,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [counter, setCounter] = useState(60);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const isOtpValid = otp.every(digit => digit.trim() !== '');
  const otpRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (counter > 0) {
      interval = setInterval(() => {
        setCounter(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [counter]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (!value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }

    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent
        animationType="slide"
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.modalTitle}>
                {languages['OTP Verification'][fontStyles.lang]}
              </Text>
              <TouchableOpacity onPress={onClose}>
                {/* <PopUpBackButton /> */}
                <SearchIcon
                  name="closecircleo"
                  size={18}
                  color={fontStyles.colors.lightBrown}
                />
              </TouchableOpacity>
            </View>

            <>
              <Text style={styles.otpMsg}>
                {message ||
                  languages['Enter registered number'][fontStyles.lang]}
              </Text>
              <View style={styles.otpContainer}>
                {otp.map((value: any, index: any) => (
                  <View key={index} style={styles.blockContainer}>
                    <TextInput
                      ref={ref => (otpRefs.current[index] = ref)}
                      style={[
                        styles.block,
                        focusedIndex === index && styles.focused,
                      ]}
                      value={value}
                      onChangeText={text => handleChange(text, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => setFocusedIndex(null)}
                    />
                    {index === 2 && <Text style={styles.separator}>-</Text>}
                  </View>
                ))}
              </View>
              <View style={styles.expireContainer}>
                <TouchableOpacity
                  onPress={
                    counter === 0
                      ? () => {
                          setCounter(60);
                          resend();
                        }
                      : null
                  }
                  disabled={counter > 0}>
                  <Text
                    style={[
                      styles.resendButton,
                      counter > 0 && {color: fontStyles.colors.dimGray},
                    ]}>
                    {counter === 0
                      ? `${languages.Resend[fontStyles.lang]}`
                      : `${
                          languages.Resend[fontStyles.lang]
                        } OTP in ${counter}`}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.closeButton}>
                <Button
                  title={languages.Verify[fontStyles.lang]}
                  variant={'contained'}
                  color={
                    isOtpValid
                      ? fontStyles.colors.primary
                      : fontStyles.colors.dimGray
                  }
                  disabled={!isOtpValid}
                  onPress={() => {
                    if (isOtpValid && !load) {
                      setload(true);
                      const eopt = otp.join('');
                      verify(eopt);
                    }
                  }}
                />
              </View>
            </>
          </View>
        </View>
      </Modal>
      {load && <AppLoader />}
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: fontStyles.colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: fontStyles.colors.white,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: fontStyles.colors.primary,
    textAlign: 'center',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 60,
  },
  btn: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: fontStyles.colors.ghostwhite,
    shadowColor: fontStyles.colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  btn2: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: fontStyles.colors.secondary,
    shadowColor: fontStyles.colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  btnText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.primary,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.greyBlack,
    textAlign: 'left',
    marginBottom: 20,
  },
  expireContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alreadyText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.lightGrey,
  },
  resendButton: {
    fontFamily: 'Montserrat-Medium',
    color: fontStyles.colors.primary,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  separator: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10,
  },
  blockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    borderColor: fontStyles.colors.lightGrey,
  },
  focused: {
    borderColor: fontStyles.colors.deepRed,
  },
  otpMsg: {
    color: 'green',
    fontSize: 10,
    marginBottom: 10,
  },
});

export default OtpVerificationScreen;
