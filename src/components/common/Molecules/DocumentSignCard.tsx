import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import fontStyles from '../../../assets/styles/constants';
import languages from '../../../common/language';

interface DocumentSignProps {
  name: any;
  id: any;
  onPress: () => void;
  label?: any;
  onCbPress?: () => void;
}
const DocumentSignCard: React.FC<DocumentSignProps> = ({
  name,
  id,
  onPress,
  label,
  onCbPress,
}) => {
  // console.log('DocumentSignCard Props:', {onPress});
  return (
    <View style={styles.card}>
      <View style={[styles.profileSection, {marginBottom: 20}]}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.id}>
            {languages.ID[fontStyles.lang]}: {id}
          </Text>
        </View>
        <View style={[styles.content]}>
          <TouchableOpacity style={[styles.btn,{marginBottom:10}]} onPress={onPress}>
            <Text style={styles.btnText}>
              {label ? label : languages.Sign[fontStyles.lang]}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <TouchableOpacity
        // onPress={loanCancel}
        style={styles.cdStatus}>
        <Text
          style={[
            styles.subLabel,
            {fontSize: 8, color: '#fff', fontWeight: 600},
          ]}>
          Loan Cancel
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={onCbPress} style={styles.cdStatus}>
        <Text
          style={[
            styles.subLabel,
            {
              fontSize: 10,
              color: '#fff',
              fontWeight: 500,
            
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
    borderWidth: 0.1,
    borderColor: fontStyles.colors.black,
    padding: 10,
    shadowColor: fontStyles.colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 5,
    width: '60%',
    gap: 5,
  },
  name: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: fontStyles.colors.darkBrown,
  },
  id: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
    color: fontStyles.colors.darkBrown,
  },
  content: {
    width: '24%',
    // alignSelf: 'flex-end',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fontStyles.colors.secondary,
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
    // padding:5
    // width:30
  },
  btnText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.primary,
  },
  // subLabel: {
  //   fontFamily: 'Montserrat-Medium',
  //   fontSize: 16,
  //   fontWeight: '400',
  //   lineHeight: 20,
  //   letterSpacing: 0.1,
  //   color: fontStyles.colors.primary,
  //   // marginLeft: 20,
  //   // marginBottom: 4,
  // },
  cdStatus: {
    backgroundColor: fontStyles.colors.primary,
    padding: 5,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'flex-end',
    marginRight: 10,
    position: 'absolute',
    right: 0,
    bottom: 5,marginTop:20
  },
  subLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.primary,
    // marginLeft: 20,
    // marginBottom: 4,
  },
});

export default DocumentSignCard;
