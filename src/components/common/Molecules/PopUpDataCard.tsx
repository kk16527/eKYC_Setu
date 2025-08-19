import React, {FC} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import fontStyles from '../../../assets/styles/constants';
import RadioButton from '../Atoms/radioButton';
import OtpSection from './OtpSection';
import Button from '../Atoms/buttons/Button';
import languages from '../../../common/language';

interface dataProps {
  title?: any;
  isChecked?: any;
  data?: any;
  onClick?: any;
  showOtp?: any;
  otp?: any;
  setOtp?: any;
  validateOtp?: any;
  counter?: number;
}

const PopUpDataCard: FC<dataProps> = ({
  title,
  isChecked,
  data,
  onClick,
  showOtp,
  otp,
  setOtp,
  validateOtp,
  counter,
}) => {
  const formatTime = (seconds: number) => {
    const secs = seconds % 60;
    return secs < 10 ? `0${secs}` : `${secs}`;
  };
  console.log('=====>cousndfjsdjf', counter);
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onClick} style={styles.cardContent}>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            isChecked={isChecked}
            onCheck={() => {}}
            checkedColor={fontStyles.colors.darkGreen}
            uncheckedColor={fontStyles.colors.strongRed}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.phone}>{title}</Text>
            <Text style={styles.no}>{data}</Text>
          </View>
        </View>
        {!showOtp && isChecked == 0 && (
          <View style={styles.innerBtn}>
            <Text style={styles.btnText}>
              {languages['Mark Primary'][fontStyles.lang]}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {showOtp && (
        <View style={{marginBottom: 20}}>
          <Text
            style={[
              styles.phone,
              {textAlign: 'left', left: 15, marginBottom: 10},
            ]}>
            {languages['Mob Code'][fontStyles.lang]} {data}
          </Text>

          <OtpSection
            otps={otp}
            handleOtp={(eotp: any) => setOtp(eotp)}
            height={17}
            width={15}
          />
          <View style={styles.expireContainer}>
            <TouchableOpacity
              onPress={counter === 0 ? () => onClick() : null} // Replace with generateOtp if needed
              disabled={counter > 0}>
              {counter > 0 ? (
                <Text
                  style={[
                    styles.resendButton,
                    {color: fontStyles.colors.dimGray}, // Use grey when disabled
                  ]}>
                  {`${
                    languages['Code Expired In'][fontStyles.lang]
                  } ${formatTime(counter)}`}
                </Text>
              ) : (
                <Text style={styles.resendButton}>
                  {languages.Resend[fontStyles.lang]}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.closeButton}>
            <Button
              title={languages.Save[fontStyles.lang]}
              variant={'contained'}
              color={fontStyles.colors.primary}
              onPress={() => validateOtp()}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 10,
    width: '95%',
  },
  closeButtonText: {
    color: fontStyles.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    borderWidth: 0.4,
    borderColor: fontStyles.colors.black,

    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.15,
    // shadowRadius: 3,
    // elevation: 3,
    // borderWidth: 0.1,
    marginTop: 16,
    // backgroundColor:'red',
  },
  cardContent: {
    // backgroundColor:'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingEnd: 10,
    // paddingStart:10,
    // paddingEnd:20,
    // borderWidth:1,
    // borderColor:'#ddd',
    marginVertical: 10,
    borderRadius: 12,
  },
  phone: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: 400,
    color: fontStyles.colors.darkBrown,
    letterSpacing: 0.15,
    lineHeight: 24,
    textAlign: 'center',
    // marginTop: 10,
  },
  no: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    fontWeight: 600,
    color: fontStyles.colors.darkBrown,
    letterSpacing: 0.25,
    lineHeight: 20,
    textAlign: 'center',
  },
  innerBtn: {
    // width: 84,
    height: 30,
    backgroundColor: fontStyles.colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 15,
  },
  btnText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.1,
    color: '#fff',
    textAlign: 'center',
  },
  alreadyText: {
    fontSize: 12,
    fontWeight: '400',
    color: fontStyles.colors.greyBlack,
  },
  expireContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  resendButton: {
    fontFamily: 'Montserrat-Medium',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default PopUpDataCard;
