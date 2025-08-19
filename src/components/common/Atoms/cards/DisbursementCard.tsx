import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import fontStyles from '../../../../assets/styles/constants';
import SquareCheckBoxes from '../checkBoxes/SquareCheckBoxes';
import languages from '../../../../common/language';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PopUpBackButton from '../../../../assets/images/svg/PopUpBackButton';
interface DisbursementProps {
  name: any;
  amount: any;
  onPress: any;
  docs?: any;
  isChecked?: any;
  setIsChecked?: any;
  view?: any;
  onCbPress?: () => void;
  loanCancel: any;
}

const DisbursementCard: React.FC<DisbursementProps> = ({
  name,
  amount,
  onPress,
  docs,
  isChecked,
  setIsChecked,
  view,
  onCbPress,
  loanCancel,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.profileSection}>
        <SquareCheckBoxes
          isChecked={isChecked}
          onCheck={setIsChecked}
          checkedColor={fontStyles.colors.primary}
          uncheckedColor={fontStyles.colors.white}
          borderColorWhenUnchecked={fontStyles.colors.black}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.id}>
              {languages['Loan Amount'][fontStyles.lang]} :{' '}
            </Text>
            <Text style={styles.amount}>{amount}</Text>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
          // backgroundColor: 'red',
        }}>
        <View
          style={[
            styles.content,
            {
              paddingLeft: 5,
              marginBottom: 10,
              // backgroundColor: 'blue',
              position: 'relative',
            },
          ]}>
          {docs.map((item: any, index: any) => (
            <TouchableOpacity
              onPress={() => {
                onPress(item.code);
                // console.log('📄 Pressed Doc Code:', item);
              }}
              key={index}
              style={styles.fieldsContainer}>
              <Text style={styles.fieldText}>{item.code}</Text>
            </TouchableOpacity>
          ))}

          <View
            style={{
              position: 'absolute',
              bottom: -2, // or 0
              right: 10, // adjust as per your spacing
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={view}>
              <Ionicons
                name={'eye'}
                size={30}
                color={fontStyles.colors.black}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={loanCancel} style={{marginLeft: 10}}>
              <Ionicons name="close-circle-outline" size={30} color={'red'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onCbPress} style={styles.cdStatus}>
        <Text
          style={[
            styles.subLabel,
            {
              fontSize: 10,
              color: '#fff',
              fontWeight: 600,
            },
          ]}>
          CB Status
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: fontStyles.colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  profileSection: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    gap: 5,
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: fontStyles.colors.darkBrown,
  },
  id: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.darkBrown,
  },
  amount: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.darkBrown,
  },
  sideContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fontStyles.colors.primary,
    height: 30,
    borderRadius: 20,
  },
  sideText: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  divider: {
    height: 1,
    backgroundColor: fontStyles.colors.cetaBlue,
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    width: '100%',
  },
  fieldsContainer: {
    justifyContent: 'center',
    backgroundColor: fontStyles.colors.secondary,
    borderRadius: 6,
    height: 30,
  },
  fieldText: {
    color: fontStyles.colors.cyan,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    marginRight: 6,
    paddingHorizontal: 12,
  },
  number: {
    fontSize: 16,
    fontWeight: '600',
    color: fontStyles.colors.primary,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: fontStyles.colors.transparentBlack,
    // marginTop: 4,
  },
  button: {
    backgroundColor: fontStyles.colors.lightishGrey,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cdStatus: {
    backgroundColor: fontStyles.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: 'flex-end',
    marginRight: 12,
    position: 'absolute',
    right: 0,
    bottom: 5,
  },
});

export default DisbursementCard;
