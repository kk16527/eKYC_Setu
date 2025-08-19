import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontStyles from '../../../../assets/styles/constants';
import languages from '../../../../common/language';

interface CustomerListProps {
  props: any;
  onPress: () => void;
}

const CustomerListCard: React.FC<CustomerListProps> = ({props, onPress}) => {
  console.log('item', props);
  // console.log('xcontact', props.contact);
  //  {/* <Text style={{color: 'black', marginTop: 5}}>Contact: {item.contact}</Text> */}

  return (
    <View style={styles.card}>
      <View style={styles.profileSection}>
        <View style={[styles.textContainer, {flexWrap: 'wrap'}]}>
          <Text style={styles.name}>
            {props.name?.toUpperCase() || languages['N/A'][fontStyles.lang]}
          </Text>
          <Text style={styles.sideText}>{props.time}</Text>
        </View>
        <View style={styles.sideContent}>
          <Text style={styles.id}>
            {languages.ID[fontStyles.lang]}: {props.custId}
          </Text>
          {/* <Text style={styles.id}>Mobile Number: {props.contact}</Text>
           */}
          {props.custtype === 'temporary' && (
            <Text style={styles.id}>
              Mobile Number: {props.contact || 'N/A'}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.content}>
        <View style={styles.fieldsContainer}>
          <Text style={{paddingHorizontal: 12, color: fontStyles.colors.white}}>
            {props.type}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <AntDesign
            name="right"
            size={13}
            color={fontStyles.colors.lightBrown}
          />
        </TouchableOpacity>
      </View>
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
    shadowColor: fontStyles.colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  profileSection: {
    // flexDirection: 'row',
    // alignItems: 'flex-start',
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  name: {
    // width: '55%',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: fontStyles.colors.darkBrown,
  },
  id: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.darkBrown,
    marginTop: 2,
  },
  sideContent: {
    // top: 5,
    // flex: 1,
    // alignItems: 'flex-end',
    color: fontStyles.colors.cyan,
  },
  sideText: {
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: fontStyles.colors.darkPink,
    fontSize: 11,
    fontWeight: '500',
    marginRight: 6,
  },
  divider: {
    height: 0.5,
    backgroundColor: fontStyles.colors.black,
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldsContainer: {
    justifyContent: 'center',
    backgroundColor: fontStyles.colors.secondary,
    borderRadius: 6,
    height: 30,
  },
  field: {
    justifyContent: 'space-between',
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
});

export default CustomerListCard;
